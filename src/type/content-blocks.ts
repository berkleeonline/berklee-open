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

export interface Module {
  contentTypeId: "module",
  fields: {
    module_title: EntryFieldTypes.Text,
    module_short_description: EntryFieldTypes.Text,
    module_description: EntryFieldTypes.RichText,
    module_level: EntryFieldTypes.Array,
    module_units: EntryFieldTypes.Array,
    module_related: EntryFieldTypes.Array,
    module_id: EntryFieldTypes.Text,
    module_image: EntryFieldTypes.AssetLink
  }
}

export interface Unit {
  contentTypeId: "unit",
  fields: {
    unit_title: EntryFieldTypes.Text
    unit_short_description: EntryFieldTypes.Text,
    unit_description: EntryFieldTypes.RichText,
    unit_activities: EntryFieldTypes.Array,
    unit_related: EntryFieldTypes.Array,
    unit_prerequisites: EntryFieldTypes.Array,
    Unit_essential_questions: EntryFieldTypes.Array,
    unit_image: EntryFieldTypes.AssetLink
  }
}

export interface Lesson {
  contentTypeId: "lesson",
  fields: {
    lesson_title: EntryFieldTypes.Text
    lesson_short_description: EntryFieldTypes.RichText,
    lesson_duration: EntryFieldTypes.Text,
    lesson_grade: EntryFieldTypes.Text,
    lesson_summary: EntryFieldTypes.Array,
    lesson_audience: EntryFieldTypes.Array,
    lesson_materials: EntryFieldTypes.Array,
    lesson_image: EntryFieldTypes.AssetLink
    lesson_sections: EntryFieldTypes.Array,
  }
}