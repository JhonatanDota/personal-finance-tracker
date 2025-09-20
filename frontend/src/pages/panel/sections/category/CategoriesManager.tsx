import { useState, useEffect } from "react";

import { getCategories } from "../../../../requests/categoryRequests";
import { handleErrors } from "../../../../requests/handleErrors";

import { CategoryModel } from "../../../../models/categoryModels";
import { CategoryTypeEnum } from "../../../../enums/categoryEnum";
import { CategoryTypeLabels } from "../../../../utils/categoryLabels";

import { FiTag } from "react-icons/fi";
import { GoGear } from "react-icons/go";

import SectionContainer from "../../components/section/SectionContainer";
import SectionTitle from "../../components/section/SectionTitle";
import SectionSubtitle from "../../components/section/SectionSubtitle";
import SectionCard from "../../components/section/SectionCard";
import SectionCardTitle from "../../components/section/SectionCardTitle";

import Table from "../../components/table/Table";
import TableHeader from "../../components/table/TableHeader";
import TableRow from "../../components/table/TableRow";
import TableHead from "../../components/table/TableHead";
import TableCell from "../../components/table/TableCell";
import TableBody from "../../components/table/TableBody";

export default function CategoriesManager() {
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  async function fethCategories() {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      handleErrors(error);
    }
  }

  function categoryTypeTag(type: CategoryTypeEnum) {
    const tagClassesMap: Record<CategoryTypeEnum, string> = {
      [CategoryTypeEnum.INCOME]: "bg-success",
      [CategoryTypeEnum.EXPENSE]: "bg-error",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium text-primary-text ${tagClassesMap[type]}`}
      >
        {CategoryTypeLabels[type]}
      </span>
    );
  }

  useEffect(() => {
    fethCategories();
  }, []);

  return (
    <SectionContainer>
      <SectionTitle title="Gerenciar Categorias" />
      <SectionSubtitle title="Crie, edite e organize suas categorias de receitas e despesas" />

      <SectionCard>
        <div className="flex justify-between">
          <SectionCardTitle
            icon={<GoGear className="w-5 h-5 text-success" />}
            title="Gerencie suas categorias"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{categoryTypeTag(category.type)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <span className="flex items-center gap-2 text-primary-text">
          <FiTag />
          <span>
            Total de
            <span className="font-bold"> {categories.length} </span>
            Categorias
          </span>
        </span>
      </SectionCard>
    </SectionContainer>
  );
}
