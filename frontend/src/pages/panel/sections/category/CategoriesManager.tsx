import SectionContainer from "../../components/section/SectionContainer";
import SectionTitle from "../../components/section/SectionTitle";
import SectionSubtitle from "../../components/section/SectionSubtitle";
import { SectionCard } from "../../components/section/SectionCard";

export default function CategoriesManager() {
  return (
    <SectionContainer>
      <SectionTitle title="Gerenciar Categorias" />
      <SectionSubtitle title="Crie, edite e organize suas categorias de receitas e despesas" />

      <SectionCard>
        <p className="text-white">Em breve</p>
      </SectionCard>
    </SectionContainer>
  );
}
