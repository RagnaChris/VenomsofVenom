import { type NextPage } from "next";

const Projects: NextPage = () => {
  return <>
    <div className="relative overflow-x-auto">
        {/* ToDo
            - Make Search bar
            - Make Add project button
         */}
        <div className="py-5 mb-10">
            <button className="float-right pl-8 pr-6 py-1 border rounded-xl border-transparent bg-green-400/10">+ List your Project</button>
        </div>
        <table className="w-full text-center px-4">
            <thead>
                <tr>
                    <th className="px-6 py-4"></th>
                    <th className="px-6 py-4"></th>
                    <th className="text-left px-6 py-4">Project Name</th>            
                    <th className="px-6 py-4">Supply</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Community</th>
                    <th className="px-6 py-4">Interest</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>A</td>
                    <td className="text-left">Venoms of Venom</td>
                    <td>TBA</td>
                    <td>TBA</td>
                    <td>567</td>
                    <td>256K</td>
                </tr>
            </tbody>
        </table>
    </div>
  </>
};

export default Projects;