export interface VideoData {
  url: string;
  _metadata: {
    uid: string;
  };
}

export interface LearningObjectivesData {
  objective: string[];
  _metadata: {
    uid: string;
  };
}

export interface PresentationOptionsData {
  option: any[]; // Change 'any' to the appropriate type if possible
  _metadata: {
    uid: string;
  };
}

export interface TakeawaysData {
  takeaway: string[];
  _metadata: {
    uid: string;
  };
}