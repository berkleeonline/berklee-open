import type { TakeawaysData } from "../../type/content-blocks";

export const Takeaways: React.FC<TakeawaysData> = ({ takeaways }) => {
    return (
        <div>
            <h2 className={`text-lg font-bold mb-2`}>Student takeaways (evidence of learning)</h2>
            <ul>
                {takeaways.takeaway.map((takeaway:string) => {
                    return (
                        <li className={`flex gap-2 mt-3 item-center`}>
                            <svg className={`h-6 w-6`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.422 34.422"><g data-name="MDI / check" opacity=".6"><path d="M29.403 9.193 12.191 26.404l-7.888-7.888 2.022-2.022 5.866 5.852L27.38 7.171Z" data-name="Path / check"/></g></svg>
                            <span className={`text-lg`}>{takeaway}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};