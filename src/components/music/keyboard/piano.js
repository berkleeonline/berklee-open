/*global Vex*/
/**
 * Contains Main class and supporting functions for piano interaction
 *
 * Class: Piano
 * JQuery-dependent: No
 * Param: customConfig object
 * Methods: run, destroy, toggle
 * DOM Requirements: Container DIV with unique ID (customConfig.placementId)
 **/


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
      loadOnClick: false
    },
    downKeys = [],
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
  var containerWidth = document.querySelector('.piano-scroll-wrapper').clientWidth;
  var desiredKeys = 40; // Number of white keys
  config.keyWidth = Math.floor(containerWidth / desiredKeys) - 2; // Subtract 2 for borders

  //No ID, no dice
  this.id = config.placementId;
  if (!this.id) {
    return 'Piano Build Failed! Specify a placement ID.';
  }

  //Shift selected octave if it was mistakenly set too low
  if (config.selectedOctave < octaveNames.indexOf(config.firstOctave) + 1) {
    config.selectedOctave += octaveNames.indexOf(config.firstOctave);
  }

  function onStateChange (event) {
    var port = event.port,
      state = port.state,
      name = port.name,
      type = port.type;
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
      pianoContainer, pianoWrapper, i, keyCount, hideBtn, previewBtn,
      octaveUp, octaveDown, helpMe, helpDialog, kPrsEvt;

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

    pianoContainer = document.createElement('div');
    pianoContainer.className = 'pianoContainer';

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
        playAudio(this.id);
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

    if (!config.noKeys) {
      var octaveControlsContainer = document.createElement('div');
      octaveControlsContainer.className = 'piano-octave-controls';
    
      octaveDown = document.createElement('button');
      octaveDown.textContent = '-';
      octaveDown.className = 'pianoOctaveDown';
      octaveDown.addEventListener('click', function () {
        if (config.selectedOctave > octaveNames.indexOf(config.firstOctave) + 1) {
          config.selectedOctave -= 1;
          highlightOctave(-1);
        }
      });
    
      octaveUp = document.createElement('button');
      octaveUp.textContent = '+';
      octaveUp.className = 'pianoOctaveUp';
      octaveUp.addEventListener('click', function () {
        if (config.selectedOctave < config.numberOfOctaves) {
          config.selectedOctave += 1;
          highlightOctave(1);
        }
      });
    
      helpMe = document.createElement('button');
      helpMe.textContent = '?';
      helpMe.className = 'pianoHelp';
      helpMe.addEventListener('click', function () {
        var helpElement = document.getElementById('pianoHelpDialog');
        helpElement.style.display = helpElement.style.display === 'block' ? 'none' : 'block';
      });
    
      octaveControlsContainer.appendChild(octaveDown);
      octaveControlsContainer.appendChild(octaveUp);
      octaveControlsContainer.appendChild(helpMe);
    
      helpDialog = document.createElement('div');
      helpDialog.textContent = 'Use your keyboard or mouse to play the piano. To shift the current selected octave range, click the - and + buttons or use the +/- keys on your keyboard.';
      helpDialog.id = 'pianoHelpDialog';
    
      // Insert the octave controls container before the piano container
      pianoContainer.parentNode.insertBefore(octaveControlsContainer, pianoContainer);
      pianoContainer.parentNode.insertBefore(helpDialog, pianoContainer);
    
      highlightOctave(false);
    }

    document.piano = true;

    if (config.hidden) {
      placementId.children[0].style.display = 'none';
      document.piano = false;
    }

    var closeButton = document.createElement('button');
    closeButton.className = 'piano-close-button';
    closeButton.innerHTML = '&times;'; // × symbol
    closeButton.setAttribute('aria-label', 'Close piano');
    // get header piano toggle, so we can let it know when the piano is closed
    const headerPianoToggle = document.querySelector('.header-piano-toggle');
    closeButton.addEventListener('click', function() {
      var pianoElement = document.getElementById(id);
      if (headerPianoToggle) {
        // This externally sets the state of the header piano toggle
        // without the extensive state management from ancestor to descendant
        headerPianoToggle.click(); 
      }
      document.piano = false;
    });
  
    // Add the close button as the first child of the piano container
    if (pianoWrapper) {
      pianoWrapper.insertBefore(closeButton, pianoWrapper.firstChild);
    } else {
      placementId.insertBefore(closeButton, placementId.firstChild);
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
  if (!config.noKeys ) {
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
                const audioElement = config.tempAudio[mn];
                
                // Set the initial volume
                const fadeOutDuration = 500; // 500 milliseconds
                const stepTime = 50; // Step every 50ms
                const steps = fadeOutDuration / stepTime;
                const volumeStep = audioElement.volume / steps;
              
                const fadeOutInterval = setInterval(() => {
                  if (audioElement.volume > volumeStep) {
                    audioElement.volume = Math.max(0, audioElement.volume - volumeStep);
                  } else {
                    // Stop the fade-out and delete the audio element when volume reaches 0
                    clearInterval(fadeOutInterval);
                    delete config.tempAudio[mn];
                  }
                }, stepTime);
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
      const audioElement = this.config.tempAudio[keys[i - 1]];
    
      // Set the initial volume
      const fadeOutDuration = 500; // 500 milliseconds
      const stepTime = 50; // Step every 50ms
      const steps = fadeOutDuration / stepTime;
      const volumeStep = audioElement.volume / steps;
    
      const fadeOutInterval = setInterval(() => {
        if (audioElement.volume > volumeStep) {
          audioElement.volume = Math.max(0, audioElement.volume - volumeStep);
        } else {
          // Stop the fade-out and delete the audio element when volume reaches 0
          clearInterval(fadeOutInterval);
          delete this.config.tempAudio[keys[i - 1]];
        }
      }, stepTime);
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
  var pianoContainer = document.getElementById(this.id);

  // Remove event listeners
  document.removeEventListener('keydown', this.keyDown);
  document.removeEventListener('keyup', this.keyUp);

  // Remove the 'open' class from the outer container
  var outerContainer = document.querySelector('.piano-outer-container');
  if (outerContainer) {
    outerContainer.classList.remove('open');
  }

  // There is no more active piano on the given page.
  document.piano = false;
};

Piano.prototype.show = function () {
  var pianoContainer = document.getElementById(this.id);

  // Add the 'open' class to the outer container
  var outerContainer = document.querySelector('.piano-outer-container');
  if (outerContainer) {
    outerContainer.classList.add('open');
  }

  document.piano = true;
};

export default Piano;