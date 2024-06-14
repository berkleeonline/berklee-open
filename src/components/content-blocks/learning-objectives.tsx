import type { LearningObjectivesData } from "../../type/content-blocks";

export const LearningObjectives: React.FC<LearningObjectivesData> = ({ learning_objectives }) => {
  return (
    <div>
      <h2 className={`text-lg font-bold mb-2`}>Learning Objectives</h2>
      <ul>
        {learning_objectives.objective.map((objective) => {
          return (
          <li className={`flex gap-2 mt-3`}>
            <svg className={`h-6 w-6`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.457 26.457"><g data-name="MDI / arrow-right-circle-outline" opacity=".6"><path d="M6.615 14.331v-2.2h8.819l-3.859-3.863 1.566-1.563 6.526 6.526-6.526 6.524-1.566-1.565 3.858-3.858H6.615m17.638-1.1A11.024 11.024 0 1 1 13.229 2.205a11.024 11.024 0 0 1 11.024 11.024m-2.2 0a8.819 8.819 0 1 0-8.819 8.819 8.819 8.819 0 0 0 8.819-8.819Z" data-name="Path / arrow-right-circle-outline"/></g></svg>
            <span className={`text-lg`}>{objective}</span>
          </li>
          )
        })}
      </ul>
    </div>
  )     
};