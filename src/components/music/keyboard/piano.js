/*global Vex*/
/**
 * Contains Main class and supporting functions for piano interaction
 *
 * Class: Piano
 * JQuery-dependent: No
 * Param: customConfig object
 * Methods: run, destroy, toggle
 * DOM Requirements: Container DIV with unique ID (customConfig.placementId)
 * CSS: theme/berkleemusic3/user_styles.css
 **/
import $ from 'jquery';

function Piano (customConfig) {
  this.keyUp = false;
  this.keyDown = false;

  this.customConfig = customConfig;
  this.id = customConfig.placementId;
}

Piano.prototype.notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
Piano.prototype.octaves = {
  C1 : 0,
  C2 : 12,
  C3 : 24,
  C4 : 36,
  C5 : 48,
  C6 : 60,
  C7 : 72,
  C8 : 84,
  fin : 85
};

Piano.prototype.run = function () {
  var  impKeys = [65, 87, 83, 69, 68, 70, 84, 71, 89, 72, 85, 74, 75, 79, 76, 80, 186, 222],
    notes = this.notes,
    noteSynonyms = {
      'C#': 'Db',
      'D#': 'Eb',
      'F#': 'Gb',
      'G#': 'Ab',
      'A#': 'Bb',
      'Db': 'C#',
      'Eb': 'D#',
      'Gb': 'F#',
      'Ab': 'G#',
      'Bb': 'A#'
    },
    octaves = this.octaves,
    octaveNames = Object.keys(octaves),
    config = this.config = {
      firstOctave : 'C1',
      middleC: true,
      oneKeyAtATime: false,
      selectedOctave : 3,
      numberOfOctaves : 8,
      keyDownColor : '#C7C7C7',
      octaveHighlightColor : 'red',
      keyWidth : 80,
      hidden : false,
      hideKey : true,
      placementId : '',
      logging : true,
      showOctaves : false,
      showNotesChords : false,
      hotKeys : false,
      noteLabels: false,
      orderLabel: false,
      loadOnClick: false,
      quiz: false
    },
    midi, data, type, note, velocity,
    // Quiz
    currentQuestion = false,
    downKeys = [],
    thisVF,
    // Staff
    staffContainer, staffDiv, staffRenderer, staffContext, renderedStaves = [],
    prop;

  //There can be only ONE -- piano running at a time
  // if (typeof document.piano === 'boolean') {
  //  return 'A piano is already running!';
  // }

  //Load custom configurations
  if (this.customConfig) {
    for (prop in this.customConfig) {
      config[prop] = this.customConfig[prop];
    }
  }

  config.numberOfOctaves = parseInt(config.numberOfOctaves);
  config.revealCorrectAnswerAfter = parseInt(config.revealCorrectAnswerAfter);

  //No ID, no dice
  this.id = config.placementId;
  if (!this.id) {
    return 'Piano Build Failed! Specify a placement ID.';
  }

  //Shift selected octave if it was mistakenly set too low
  if (config.selectedOctave < octaveNames.indexOf(config.firstOctave) + 1) {
    config.selectedOctave += octaveNames.indexOf(config.firstOctave);
  }

  // request MIDI access
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
      sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
  }

  // midi functions
  function onMIDISuccess (midiAccess) {
    midi = midiAccess;
    config.midiKeyboardIn = true;
    var inputs = midi.inputs.values();
    // loop through all inputs
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
      // listen for midi messages
      input.value.onmidimessage = onMIDIMessage;
      // this just lists our inputs in the console
      listInputs(input);
    }
    // listen for connect/disconnect message
    midi.onstatechange = onStateChange;
  }

  function onMIDIMessage (event) {
    // these variables are defined in the parent
    // scope (the Piano.prototype.run function)
    data = event.data;
    type = data[0] & 0xf0;
    note = data[1];
    velocity = data[2];

    switch (type) {
    case 144: // noteOn message
      noteOn(note, velocity);
      break;
    case 128: // noteOff message
      noteOff();
      break;
    }
  }

  function onStateChange (event) {
    var port = event.port,
      state = port.state,
      name = port.name,
      type = port.type;
  }

  function listInputs (inputs) {
    var input = inputs.value;
    // log('Input port : [ type:\'' + input.type + '\' id: \'' + input.id +
    //       '\' manufacturer: \'' + input.manufacturer + '\' name: \'' + input.name +
    //       '\' version: \'' + input.version + '\']');
  }

  function noteOn (midiNote, velocity) {
    var mn;
    /* eslint-disable-next-line ember/no-jquery */
    if ($('#piano-hide-handle').prop('checked')) {
      midiNote = midiNote - 24;
      if (midiNote < 85 && velocity > 0) {
        document.getElementById('key_' + midiNote).style.background = config.keyDownColor;
        playAudio('key_' + midiNote, velocity);
      } else if (velocity === 0 && midiNote < 85) {
        mn = 'key_' + midiNote;
        if (config.tempAudio[mn]) {
          /* eslint-disable-next-line ember/no-jquery */
          $(config.tempAudio[mn]).animate({volume: 0}, 500);
          delete config.tempAudio[mn];
        }
        document.getElementById('key_' + midiNote).style.background = '';
      }
    }
  }

  function noteOff () {
    // Note Off chng duration
  }

  function onMIDIFailure (e) {
    log('No access to MIDI devices or your browser doesn\'t support WebMIDI API. Please use WebMIDIAPIShim ' + e);
  }

  // Playing functions
  function playAudio (key) {
    var audioFile = config.keyDirs[key],
      note = notes[parseInt(key.replace('key_', ''), 10) % 12],
      evt;

    evt = document.createEvent('CustomEvent');
    evt.initCustomEvent('piano-keyspressed', false, false, { 'detail':  note});
    document.getElementById(config.placementId).dispatchEvent(evt);

    config.play(audioFile, key);
  }

  this.playAudio = playAudio;

  function drawStaff (keyedNotes) {
    var toDraw = [],
      spl, note, octave, i, fullNote, totalNotes,
      keys = config.quiz.signature.split('/'),
      notesPerLine = config.quiz.measuresPerLine * keys[0],
      numRows = keyedNotes && keyedNotes.length > 0 ? Math.ceil(keyedNotes.length / notesPerLine) : 1,
      voiceVal = 0,
      barSplit = 0,
      currentNotesCount = 0,
      voices = [];

    staffRenderer.resize(750, (numRows * 130) + 40);

    if(config.renderStaff === 'false') {
      return;
    }

    staffContext.clear();
    renderedStaves = [];

    if (keyedNotes && keyedNotes.length > 0) {
      for (i = 0; i < keyedNotes.length; i++) {
        spl = keyedNotes[i].split('_')[1];
        note = notes[spl % notes.length];

        if (!toDraw[barSplit]) {
          toDraw[barSplit] = [];
        } else if (currentNotesCount === notesPerLine) {
          barSplit++;
          currentNotesCount = 0;
          toDraw[barSplit] = [];
        }

        // check if we should be using flats, sub accordingly.
        if (currentQuestion.accidental === 'b') {
          note = noteSynonyms[note] || note;
        }

        octave = Math.floor(spl / notes.length) + 1;
        fullNote = note + '/' + octave;

        if (currentNotesCount % keys[0] === 0 && currentNotesCount !== 0) {
          toDraw[barSplit].push(new thisVF.BarNote());
        }

        voiceVal += 1;

        // check the note name for an accidental and draw if needed
        if (!(/[A-G][#b]/.test(note))) {
          toDraw[barSplit].push(new thisVF.StaveNote({
            clef: 'treble',
            keys: [fullNote],
            duration: 'q',
            auto_stem: true
          }));
        } else {
          toDraw[barSplit].push(new thisVF.StaveNote({
            clef: 'treble',
            keys: [fullNote],
            duration: 'q',
            auto_stem: true
          }).addAccidental(0, new thisVF.Accidental(currentQuestion.accidental)));
        }

        currentNotesCount++;
      }

      totalNotes = (barSplit * notesPerLine) + currentNotesCount;
    } else {
      toDraw = [[]];
    }

    for (i = 0; i < toDraw.length; i++) {
      var drawThis = toDraw[i],
        staffLoc = 0,
        beatCount = totalNotes > notesPerLine ? notesPerLine : totalNotes;

      totalNotes -= notesPerLine;

      // Render stave
      if (renderedStaves.length > 0) {
        staffLoc = renderedStaves[renderedStaves.length - 1].y + renderedStaves[renderedStaves.length - 1].height + 40;
      }
      renderedStaves.push(new thisVF.Stave(0, staffLoc, 750));

      if (i === 0) {
        // Add a clef and time signature.
        renderedStaves[renderedStaves.length - 1].addClef('treble').addTimeSignature(config.quiz.signature);
      }

      // Connect it to the rendering context and draw!
      renderedStaves[renderedStaves.length - 1].setContext(staffContext).draw();

      if (drawThis.length > 0) {
        voices.push(new thisVF.Voice({num_beats: beatCount, beat_value: keys[1]}));

        voices[voices.length - 1].addTickables(drawThis);

        // Format and justify the notes to 400 pixels.
        new thisVF.Formatter().joinVoices([voices[voices.length - 1]]).format([voices[voices.length - 1]], 50 * drawThis.length);

        // Render voice
        voices[voices.length - 1].draw(staffContext, renderedStaves[renderedStaves.length - 1]);
      }
    }
  }

  function clearPiano (red) {
    var blueKeys = document.getElementById(config.placementId).querySelectorAll('.pianoContainer > div'),
      blueKeyLength = blueKeys.length,
      key;

    if (blueKeyLength > 0) {
      if (red) {
        blueKeys = document.querySelectorAll('#' + config.placementId + ' .selected');
        blueKeyLength = blueKeys.length;
        for (key = 0; key < blueKeyLength; key++) {
          blueKeys[key].classList.add('incorrect');
        }
      } else {
        blueKeys[0].parentNode.classList.remove('filled');
        config.quiz.selectedKeys = [];

        for (key = 0; key < blueKeyLength; key++) {
          blueKeys[key].classList.remove('selected');
          blueKeys[key].classList.remove('correct');
          blueKeys[key].classList.remove('incorrect');
        }
      }

      drawStaff(false);
    }
  }

  function selectKeys (key) {
    var keyNode, i;
    if (typeof key === 'object') {
      for (i = 0; i < key.length; i++) {
        keyNode = document.getElementById(config.placementId).querySelectorAll('#key_' + key[i]);
        keyNode[0].classList.add('selected');
        config.quiz.selectedKeys.push('key_' + key[i]);
      }
    }
  }

  function highlightOctave (shift) {
    var newOctave = config.selectedOctave,
      oldOctaveStart = octaves[octaveNames[newOctave - shift - 1]],
      oldOctaveEnd = octaves[octaveNames[newOctave - shift]],
      newOctaveStart = octaves[octaveNames[newOctave - 1]],
      newOctaveEnd = octaves[octaveNames[newOctave]],
      keyName = ['A', 'W', 'S', 'E', 'D', 'F', 'T', 'G', 'Y', 'H', 'U', 'J', 'K', 'O', 'L', 'P', ';', '\''],
      scrollWrapper = document.querySelector('.piano-scroll-wrapper'),
      pianoContainer = document.querySelector('.pianoContainer'),
      i, cnt, currKey, evt;
  
    console.log('Highlighting octave:', newOctave);
  
    if (shift) {
      for (i = oldOctaveStart; i < oldOctaveEnd + 6; i++) {
        currKey = document.getElementById('key_' + i);
        if (currKey) {
          currKey.style.borderColor = '';
          currKey.style.background = '';
          currKey.setAttribute('shortcut', '');
        }
      }
    }
  
    for (i = newOctaveStart, cnt = 0; i < newOctaveEnd + 6; i++, cnt++) {
      currKey = document.getElementById('key_' + i);
      if (currKey) {
        currKey.style.borderColor = config.octaveHighlightColor;
  
        if (config.hotKeys) {
          if (!currKey.querySelector('p')) {
            currKey.appendChild(document.createElement('p'));
          }
          currKey.setAttribute('shortcut', keyName[cnt]);
        }
      }
    }
  
    if (scrollWrapper && pianoContainer) {
      // Calculate the octave width and scroll position
      var octaveWidth = pianoContainer.clientWidth / config.numberOfOctaves;
      var scrollPosition = octaveWidth * (newOctave - 1);
      
      // Calculate the center position
      var viewportWidth = scrollWrapper.clientWidth;
      var centerPosition = scrollPosition - (viewportWidth / 2) + (octaveWidth / 2);
  
      // Ensure the scroll position is within bounds
      var maxScroll = pianoContainer.clientWidth - viewportWidth;
      centerPosition = Math.max(0, Math.min(centerPosition, maxScroll));
  
      console.log('Viewport width:', viewportWidth);
      console.log('Piano width:', pianoContainer.clientWidth);
      console.log('Octave width:', octaveWidth);
      console.log('Calculated center position:', centerPosition);
  
      // Scroll the container
      scrollWrapper.scrollLeft = centerPosition;
  
      console.log('Set scrollLeft to:', scrollWrapper.scrollLeft);
    } else {
      console.error('Could not find piano container or scroll wrapper');
    }
  
    evt = document.createEvent('CustomEvent');
    evt.initCustomEvent('piano-octavechanged', false, false, { 'detail':  octaveNames[newOctave]});
    document.getElementById(config.placementId).dispatchEvent(evt);
  }

  function isBlackKey (keynum) {
    var blackKeys = [
      false, true, false, true, false, false,
      true, false, true, false, true, false
    ];

    //Take care of A0 octave
    if (keynum === -2) {
      return true;
    }

    return blackKeys[keynum % 12];
  }

  //Audio tag -- for non-webAudio browsers
  function loadSoundAudioTag (url, keyCount, placementId) {
    var audioContainer = document.getElementsByClassName('audioContainer')[0],
      audio;

    if (typeof audioContainer === 'undefined') {
      audioContainer = document.createElement('div');
      audioContainer.className = 'audioContainer';
    }

    audio = document.createElement('audio');
    audio.src = url;
    audio.preload = 'auto';
    audioContainer.appendChild(audio);
    audio.volume = 0;

    placementId.appendChild(audioContainer);
  }

  function playSoundAudioTag (url, key) {
    if (!config.tempAudio) {
      config.tempAudio = {};
    }
    config.tempAudio[key] = new Audio(url);
    config.tempAudio[key].play();
  }

  function buildPiano (id) {
    var blackKeys = 0,
      whiteKeys = 0,
      blackKey = {
        width: config.keyWidth / 1.5,
        height: (config.keyWidth / 1.5) * 4
      },
      whiteKey = {
        width: config.keyWidth,
        height: (config.keyWidth / 1.5) * 8,
      },
      halfBlackKey = '-' + blackKey.width / 2 + 'px',
      placementId = document.getElementById(id),
      pianoKeys = [],
      questionContentDiv,
      questionContentText,
      questionFeedbackRight, questionFeedbackWrong,
      checkAnswerDiv, showAnswerDiv,
      prevQuestionDiv, nextQuestionDiv,
      clearKeyboardDiv,
      pianoContainer, pianoWrapper, i, keyCount, hideBtn, previewBtn,
      octaveUp, octaveDown, helpMe, helpDialog, kPrsEvt,

      changeQuestion = function (questionNumber) {
        if (questionNumber >= 0) {
          questionFeedbackWrong.classList.remove('active');
          questionFeedbackRight.classList.remove('active');

          if (questionNumber > 0) {
            prevQuestionDiv.classList.remove('inactive');
          } else {
            prevQuestionDiv.classList.add('inactive');
          }

          if (parseInt(questionNumber) === parseInt(config.quiz.questions.length - 1)) {
            nextQuestionDiv.classList.add('inactive');
          } else {
            nextQuestionDiv.classList.remove('inactive');
          }

          if (currentQuestion.questionContent) {
            questionContentText.innerHTML = currentQuestion.questionContent;
          }

          if (currentQuestion.feedbackWrong) {
            questionFeedbackWrong.textContent = currentQuestion.feedbackWrong;
          }

          if (currentQuestion.feedbackRight) {
            questionFeedbackRight.textContent = currentQuestion.feedbackRight;
          }

          currentQuestion.attempts = 0;

          clearPiano();

          if (currentQuestion.firstNote[0]) {
            selectKeys(currentQuestion.firstNote);
          }
        }
      };

    //Some browsers handle ready events poorly. Final check to make sure DOM is loaded
    if (!placementId) {
      return;
    }

    //Number of keys to build -- make sure there aren't too many!
    keyCount = octaves[octaveNames[(octaveNames.indexOf(config.firstOctave) + config.numberOfOctaves)]];
    if (!keyCount) {
      keyCount = octaves.fin;
    }

    //Check if touchstart is supported -- Mobile Device
    if ('ontouchstart' in document.documentElement) {
      kPrsEvt = 'touchstart';
    } else {
      kPrsEvt = 'mousedown';
    }

    //Identify Sound Context
    config.load = loadSoundAudioTag;
    config.play = playSoundAudioTag;

    if (config.quiz) {
      currentQuestion = config.quiz.questions[0];
      currentQuestion.number = 0;
      currentQuestion.attempts = 0;
    }

    if (currentQuestion) {
      questionContentDiv = document.createElement('div');
      questionContentDiv.className = 'questionContent';

      if (currentQuestion.questionContent) {
        questionContentText = document.createElement('p');
        questionContentText.innerHTML = currentQuestion.questionContent;

        questionContentDiv.appendChild(questionContentText);
      }

      placementId.appendChild(questionContentDiv);

      if (currentQuestion.feedbackWrong) {
        questionFeedbackWrong = document.createElement('div');
        questionFeedbackWrong.className = 'questionFeedbackWrong';
        questionFeedbackWrong.textContent = currentQuestion.feedbackWrong;
        placementId.appendChild(questionFeedbackWrong);
      }

      if (currentQuestion.feedbackRight) {
        questionFeedbackRight = document.createElement('div');
        questionFeedbackRight.className = 'questionFeedbackRight';
        questionFeedbackRight.textContent = currentQuestion.feedbackRight;
        placementId.appendChild(questionFeedbackRight);
      }

      if (currentQuestion.previewInput) {
        previewBtn = document.createElement('div');
        previewBtn.className = 'previewBtn fas fa-play';
        //previewBtn.textContent = ' Preview';
        placementId.appendChild(previewBtn);
        previewBtn.addEventListener('click', function () {
          var selKeyCount = config.quiz.selectedKeys.length,
            waitTime, totalWait;

          if (currentQuestion.previewInput === 'chord') {
            waitTime = 10;
          } else {
            waitTime = 500;
          }

          for (i = 0; i < selKeyCount; i++) {
            setTimeout(function () {
              playAudio(config.quiz.selectedKeys[arguments[0]]);
            }.bind(false, i), i * waitTime);
          }

          if (currentQuestion.previewInput === 'both') {
            totalWait = (i + 1) * waitTime;
            waitTime = 10;

            for (i = 0; i < selKeyCount; i++) {
              setTimeout(function () {
                playAudio(config.quiz.selectedKeys[arguments[0]]);
              }.bind(false, i), (i * waitTime) + totalWait);
            }
          }
        });
      }

      clearKeyboardDiv = document.createElement('div');
      clearKeyboardDiv.className = 'clearKeyboard far fa-trash';
      clearKeyboardDiv.setAttribute('tooltip', 'Clear Keyboard');
      //clearKeyboardDiv.textContent = ' Clear Keyboard'
      clearKeyboardDiv.addEventListener('click', function () {
        questionFeedbackWrong.classList.remove('active');
        questionFeedbackRight.classList.remove('active');
        clearPiano();
        if (currentQuestion.firstNote[0]) {
          selectKeys(currentQuestion.firstNote);
        }
      });
      placementId.appendChild(clearKeyboardDiv);

      showAnswerDiv = document.createElement('div');
      showAnswerDiv.className = 'showAnswer fas fa-eye';
      showAnswerDiv.setAttribute('tooltip', 'Reveal Answer');
      //showAnswerDiv.textContent = ' Reveal Answer';
      showAnswerDiv.addEventListener('click', function () {
        var currKey;
        if (config.easyMode || currentQuestion.attempts >= config.revealCorrectAnswerAfter) {
          clearPiano(true);
          for (i = 0; i < currentQuestion.answer.length; i++) {
            currKey = document.querySelectorAll('#' + config.placementId + ' #key_' + currentQuestion.answer[i])[0];
            currKey.classList.add('correct');
          }

          if (currentQuestion.number + 1 < config.quiz.questions.length) {
            //config.easyMode = true;
            nextQuestionDiv.classList.remove('inactive');
          }
        }

      });
      placementId.appendChild(showAnswerDiv);

      checkAnswerDiv = document.createElement('div');
      checkAnswerDiv.className = 'checkAnswer fas fa-check';
      checkAnswerDiv.setAttribute('tooltip', 'Check Answer');
      //checkAnswerDiv.textContent = ' Check Answer';
      checkAnswerDiv.addEventListener('click', function () {
        var answerIsCorrect = false,
          answerLength = config.quiz.selectedKeys.length;

        if (currentQuestion.answer.length === answerLength) {
          for (i = 0; i < answerLength; i++) {
            if (currentQuestion.orderMatters) {
              if ('key_' + currentQuestion.answer[i].toString() === config.quiz.selectedKeys[i]) {
                answerIsCorrect = true;
              } else {
                answerIsCorrect = false;
                break;
              }
            } else {
              if (config.quiz.selectedKeys.indexOf('key_' + currentQuestion.answer[i].toString()) > -1) {
                answerIsCorrect = true;
              } else {
                answerIsCorrect = false;
                break;
              }
            }
          }
          if (answerIsCorrect) {
            questionFeedbackWrong.classList.remove('active');
            questionFeedbackRight.classList.add('active');

            /*if (currentQuestion.number + 1 < config.quiz.questions.length) {
              nextQuestionDiv.classList.remove('inactive');
            }*/
          } else {
            questionFeedbackWrong.classList.add('active');
            questionFeedbackRight.classList.remove('active');
            currentQuestion.attempts += 1;
          }
        } else {
          questionFeedbackWrong.classList.add('active');
          questionFeedbackRight.classList.remove('active');
          currentQuestion.attempts += 1;
        }
      });
      placementId.appendChild(checkAnswerDiv);

      prevQuestionDiv = document.createElement('div');
      prevQuestionDiv.className = 'prevQuestion inactive fas fa-arrow-left';
      prevQuestionDiv.setAttribute('tooltip', 'Previous Question');
      //prevQuestionDiv.textContent = ' Previous Question';
      prevQuestionDiv.addEventListener('click', function () {
        var newNumber = currentQuestion.number - 1;

        if (!prevQuestionDiv.classList.contains('inactive')) {
          currentQuestion = config.quiz.questions[newNumber];
          currentQuestion.number = newNumber;
          changeQuestion(newNumber);
        }
      });
      placementId.appendChild(prevQuestionDiv);


      nextQuestionDiv = document.createElement('div');
      nextQuestionDiv.className = 'nextQuestion fas fa-arrow-right';
      nextQuestionDiv.setAttribute('tooltip', 'Next Question');
      //nextQuestionDiv.textContent = ' Next Question';
      nextQuestionDiv.addEventListener('click', function () {
        var newNumber = currentQuestion.number + 1;

        if (!nextQuestionDiv.classList.contains('inactive')) {
          currentQuestion = config.quiz.questions[newNumber];
          currentQuestion.number = newNumber;
          changeQuestion(newNumber);
        }
      });
      placementId.appendChild(nextQuestionDiv);

      pianoWrapper = document.createElement('div');
      pianoWrapper.className = 'pianoOuterWrapper';
    }

    pianoContainer = document.createElement('div');
    pianoContainer.className = 'pianoContainer';

    staffContainer = document.createElement('div');
    staffContainer.className = 'staffContainer';



    // Render Staff
    if (config.renderStaff === 'true') {
      thisVF = Vex.Flow;

      // Create an SVG renderer and attach it to the DIV element named "boo".
      staffDiv = staffContainer;
      staffRenderer = new thisVF.Renderer(staffDiv, thisVF.Renderer.Backends.SVG);

      // Configure the rendering context.
      staffRenderer.resize(750, 120);
      staffContext = staffRenderer.getContext();
      staffContext.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');

      // Create a stave of width 400 at position 10, 40 on the canvas.
      renderedStaves.push(new thisVF.Stave(0, 0, 750));

      // Add a clef and time signature.
      renderedStaves[renderedStaves.length - 1].addClef('treble').addTimeSignature(config.quiz.signature);

      // Connect it to the rendering context and draw!
      renderedStaves[renderedStaves.length - 1].setContext(staffContext).draw();

      // Render piano
      placementId.appendChild(staffContainer);
    }

    if (pianoWrapper) {
      placementId.appendChild(pianoWrapper);
      pianoWrapper.appendChild(pianoContainer);
    } else {
      placementId.appendChild(pianoContainer);
    }

    //Render keys and attach listeners.
    for (i = octaves[config.firstOctave]; i < keyCount; i++) {
      pianoKeys[i] = document.createElement('div');

      if (isBlackKey(i)) {
        pianoKeys[i].className = 'blackKey';
        pianoKeys[i].style.width = blackKey.width + 'px';
        pianoKeys[i].style.height = blackKey.height + 'px';

        blackKeys += 1;
      } else {
        pianoKeys[i].className = 'whiteKey';
        pianoKeys[i].style.width = whiteKey.width + 'px';
        pianoKeys[i].style.height = whiteKey.height + 'px';

        if (isBlackKey(i - 1)) {
          pianoKeys[i].style.marginLeft =  halfBlackKey;
        }
        if (isBlackKey(i + 1)) {
          pianoKeys[i].style.marginRight = halfBlackKey;
        }

        whiteKeys += 1;
      }

      pianoKeys[i].id = 'key_' + i;

      if (config.noteLabels === 'true' && !isBlackKey(i)) {
        pianoKeys[i].appendChild(document.createElement('p'));
        pianoKeys[i].firstChild.textContent = notes[i % notes.length];
      }

      pianoContainer.appendChild(pianoKeys[i]);

      pianoKeys[i].addEventListener(kPrsEvt, function () {
        if (config.quiz && config.quiz.oneKeyEntry) {

          if (config.oneKeyAtATime === 'true') {
            clearPiano();
          }

          questionFeedbackWrong.classList.remove('active');
          questionFeedbackRight.classList.remove('active');

          if (this.classList.contains('selected')) {
            this.classList.remove('selected');
            this.classList.remove('correct');
            this.classList.remove('incorrect');
            if (config.orderLabel === 'true') {
              this.removeAttribute('order');
            }
            config.quiz.selectedKeys.splice(config.quiz.selectedKeys.indexOf(this.id), 1);

            if (config.quiz.maxKeys && config.quiz.selectedKeys.length < config.quiz.maxKeys) {
              this.parentNode.classList.remove('filled');
            }
          } else if (!this.parentNode.classList.contains('filled')) {
            playAudio(this.id);
            if (config.orderLabel === 'true') {
              this.setAttribute('order', config.quiz.selectedKeys.length + 1);
            }
            this.classList.add('selected');
            config.quiz.selectedKeys.push(this.id);

            if (config.quiz.maxKeys && config.quiz.selectedKeys.length >= config.quiz.maxKeys) {
              this.parentNode.classList.add('filled');
            }
          }
          drawStaff(config.quiz.selectedKeys);
        } else {
          playAudio(this.id);
        }
      });

      //Buffer audio
      config.load(config.keyDirs[pianoKeys[i].id], keyCount, placementId);
    }

    if (config.middleC === 'true' && pianoKeys[octaves.C4]) {
      pianoKeys[octaves.C4].classList.add('middleC');
    }

    //Set static width and height of piano container.
    pianoContainer.style.width = ((whiteKeys) * (parseInt(config.keyWidth) + 2)) + (blackKeys * 2) + 'px';
    pianoContainer.style.height = whiteKey.height + 2 + 'px';

    if (config.hideKey) {
      hideBtn = document.getElementsByClassName('pianoHideBtn')[0];
      if (hideBtn) {
        hideBtn.parentNode.removeChild(hideBtn);
      }

      hideBtn = document.createElement('div');
      hideBtn.className = 'pianoHideBtn';
      placementId.appendChild(hideBtn);

      hideBtn.addEventListener('click', function (evt) {
        var pianoElement = evt.target.parentElement.children[0];

        if (pianoElement.style.display === 'none') {
          pianoElement.style.display = '';
          document.piano = true;
        } else {
          pianoElement.style.display = 'none';
          document.piano = false;
        }
      });
    }

    if ((!config.quiz || !config.quiz.oneKeyEntry) && !config.noKeys && !config.midiKeyboardIn) {
      octaveUp = document.createElement('div');
      octaveUp.textContent = '+';
      octaveUp.className = 'pianoOctaveUp';
      octaveUp.addEventListener('click', function () {
        if (config.selectedOctave < config.numberOfOctaves) {
          config.selectedOctave += 1;
          highlightOctave(1);
        }
      });

      octaveDown = document.createElement('div');
      octaveDown.textContent = '-';
      octaveDown.className = 'pianoOctaveDown';
      octaveDown.addEventListener('click', function () {
        if (config.selectedOctave > octaveNames.indexOf(config.firstOctave) + 1) {
          config.selectedOctave -= 1;
          highlightOctave(-1);
        }
      });

      helpDialog = document.createElement('div');
      helpDialog.textContent = 'TIP: Use your keyboard or mouse to play the piano. To shift the current selected octave range, click the - and + buttons or use the +/- keys on your keyboard.';
      helpDialog.id = 'pianoHelpDialog';

      helpMe = document.createElement('div');
      helpMe.textContent = '?';
      helpMe.id = 'pianoHelp';
      helpMe.addEventListener('click', function () {
        var helpElement = document.getElementById('pianoHelpDialog');

        if (helpElement.style.display === 'block') {
          helpElement.style.display = '';
        } else {
          helpElement.style.display = 'block';
        }
      });

      pianoContainer.parentNode.appendChild(helpMe);
      pianoContainer.parentNode.appendChild(helpDialog);
      pianoContainer.parentNode.appendChild(octaveDown);
      pianoContainer.parentNode.appendChild(octaveUp);

      highlightOctave(false);
    }

    if (currentQuestion && currentQuestion.firstNote[0]) {
      selectKeys(currentQuestion.firstNote);
    }
    document.piano = true;

    if (config.hidden) {
      placementId.children[0].style.display = 'none';
      document.piano = false;
    }

    return 'Piano Built Sucessfully!';
  }

  //Load Piano immediately
  function loadNow () {
    var log = buildPiano(config.placementId);
  }

  //Load piano when button is pressed (Helps save bandwidth)
  function loadOnClick () {
    var hideBtn,
      placementId = document.getElementById(config.placementId);

    hideBtn = document.createElement('div');
    hideBtn.className = 'pianoHideBtn';
    placementId.appendChild(hideBtn);

    config.hidden = false;

    hideBtn.addEventListener('click', function () {
      loadNow();
    });
  }

  //Build piano and log if needed
  function ready () {
    //Either load piano on click OR load with page
    if (config.loadOnClick) {
      loadOnClick();
    } else {
      loadNow();
    }
  }

  if (document.readyState === 'complete') {
    ready();
  } else {
    document.addEventListener('readystatechange', function(){
      if (document.readyState === 'complete') {
        ready();
      }
    });
  }

  //Process keypresses (If those are enabled)
  if ((!config.quiz || !config.quiz.oneKeyEntry) && !config.noKeys && !config.midiKeyboardIn) {
    this.keyDown = function (evt) {
      var keyCode = evt.keyCode !== 59 ? evt.keyCode : 186,
        keyIndex;

      // Remove this condition to allow keyboard input regardless of the checkbox state
      // if ($('#piano-hide-handle').prop('checked')) {
        if (document.piano) {
          //Prevent repeating keys
          keyIndex = impKeys.indexOf(keyCode);
          if (keyIndex > -1) {
            if (typeof downKeys[keyCode] === 'undefined') {
              downKeys[keyCode] = keyIndex;
              keyIndex += octaves[octaveNames[config.selectedOctave - 1]];
              if (keyIndex < 85) {
                playAudio('key_' + keyIndex);
                document.getElementById('key_' + keyIndex).style.background = config.keyDownColor;
                evt.preventDefault();
              }
            }
          }

          //Octave shift with + and - keys
          if ((keyCode === 187 || keyCode === 61) && config.selectedOctave < config.numberOfOctaves) {
            config.selectedOctave += 1;
            highlightOctave(1);
          } else if ((keyCode === 189 || keyCode === 173) && config.selectedOctave > octaveNames.indexOf(config.firstOctave) + 1) {
            config.selectedOctave -= 1;
            highlightOctave(-1);
          }
        }
      // }
    };

    this.keyUp = function (evt) {
      var keyCode = evt.keyCode !== 59 ? evt.keyCode : 186,
        keyIndex = impKeys.indexOf(keyCode),
        mn;

      // Remove this condition to allow keyboard input regardless of the checkbox state
      // if ($('#piano-hide-handle').prop('checked')) {
        if (document.piano) {
          if (keyIndex > -1) {
            keyIndex += octaves[octaveNames[config.selectedOctave - 1]];
            if (keyIndex < 85) {
              mn = 'key_' + keyIndex;
              document.getElementById(mn).style.background = '';
              if (config.tempAudio[mn]) {
                $(config.tempAudio[mn]).animate({volume: 0}, 500);
                delete config.tempAudio[mn];
              }
              delete downKeys[keyCode];
            }
          }
        }
      // }
    };

    window.document.addEventListener('keydown', this.keyDown);
    window.document.addEventListener('keyup', this.keyUp);
  }
};

Piano.prototype.playNotes = async function playNoteRange(noteIDs, waitTime, noOverlap) {
  let keys = noteIDs.map(this.getKeyFromNoteID.bind(this));

  for (let i = 0; i < keys.length; i++) {
    if (noOverlap && i > 0 && this.config.tempAudio[keys[i - 1]]) {
      /* eslint-disable-next-line ember/no-jquery */
      $(this.config.tempAudio[keys[i - 1]]).animate({volume: 0}, 500);
      delete this.config.tempAudio[keys[i - 1]];
    }
    this.playAudio(keys[i]);
    await wait(waitTime);
  }

  function wait(milliseconds) {
    return new Promise(res => {
      window.setTimeout(() => {
        res();
      }, milliseconds);
    });
  }
};

Piano.prototype.getKeyFromNoteID = function getKeyFromNoteString(noteID) {
  let key = "key_" + noteID;

  return key;
};

Piano.prototype.destroy = function () {
  var outerContainer = document.getElementById(this.id);

  // Remove event listeners
  document.removeEventListener('keydown', this.keyDown);
  document.removeEventListener('keyup', this.keyUp);

  // Check if outerContainer exists before attempting to remove children
  if (outerContainer) {
    // Remove all placementId children, but keep the node.
    while (outerContainer.firstChild) {
      outerContainer.removeChild(outerContainer.firstChild);
    }
  } else {
    console.warn('Piano container not found during destroy.');
  }

  // There is no more active piano on the given page.
  delete document.piano;
};

Piano.prototype.toggle = function () {
  var pianoBtn = document.querySelector('.pianoHideBtn');

  if (pianoBtn) {
    pianoBtn.click();
  } else {
    console.warn('Piano hide button not found during toggle.');
  }
};

export default Piano;
