import { Link } from "react-router-dom";
import FeatureHighlight from "./components/FeatureHighlight";

import {
  MdAttachMoney,
  MdBarChart,
  MdCloudQueue,
  MdOutlineFileDownload,
} from "react-icons/md";

export default function Home() {
  return (
    <div className="md:w-2/3 md:mx-auto flex flex-col justify-center items-center p-4 gap-5 md:gap-8 mt-10">
      <h3 className="text-4xl md:text-5xl font-bold text-white text-center">
        Controle total sobre ganhos e despesas em um só lugar.
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5">
        <FeatureHighlight
          icon={MdAttachMoney}
          title="Registre seus movimentos"
          text="Adicione ganhos e despesas de forma rápida e simples, sem complicação."
        />

        <FeatureHighlight
          icon={MdBarChart}
          title="Visualize com gráficos"
          text="Entenda para onde seu dinheiro vai com gráficos claros e objetivos."
        />

        <FeatureHighlight
          icon={MdCloudQueue}
          title="Acesse de onde estiver"
          text="Controle suas finanças a qualquer hora, de qualquer lugar."
        />

        <FeatureHighlight
          icon={MdOutlineFileDownload}
          title="Exporte seus dados"
          text="Salve suas finanças em arquivos e tenha tudo em suas mãos quando quiser."
        />
      </div>

      <Link to="/login">
        <button className="text-base md:text-lg p-4 rounded-md font-extrabold uppercase bg-orange-500 text-white">
          EU QUERO!
        </button>
      </Link>
    </div>
  );
}
