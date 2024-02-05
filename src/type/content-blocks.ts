import type { EntryFieldTypes } from "contentful";

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

export interface Unit {
  contentTypeId: "unit",
  fields: {
    unit_title: EntryFieldTypes.Text
    unit_description: EntryFieldTypes.RichText,
    unit_activities: EntryFieldTypes.Array,
    unit_related: EntryFieldTypes.Array,
    unit_prerequisites: EntryFieldTypes.Array,
    Unit_essential_questions: EntryFieldTypes.Array,
    Unit_image: EntryFieldTypes.AssetLink
  }
}