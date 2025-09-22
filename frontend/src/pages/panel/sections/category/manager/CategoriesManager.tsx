import { useState, useEffect } from "react";

import { getCategories } from "../../../../../requests/categoryRequests";
import { handleErrors } from "../../../../../requests/handleErrors";

import { CategoryModel } from "../../../../../models/categoryModels";

import { FiTag } from "react-icons/fi";
import { GoGear } from "react-icons/go";
import { FaPlus } from "react-icons/fa";

import Loader from "../../../components/misc/Loader";
import SectionContainer from "../../../components/section/SectionContainer";
import SectionTitle from "../../../components/section/SectionTitle";
import SectionSubtitle from "../../../components/section/SectionSubtitle";
import SectionCard from "../../../components/section/SectionCard";
import SectionCardTitle from "../../../components/section/SectionCardTitle";
import CategoriesTable from "./CategoriesTable";
import AddCategoryDialog from "./actions/AddCategoryDialog";

export default function CategoriesManager() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);
  async function fetchCategories() {
    try {
      setLoading(true);
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
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

          <button
            onClick={() => setOpenAddCategoryDialog(true)}
            className="button-action"
          >
            <FaPlus />
          </button>
        </div>

        {loading ? <Loader /> : <CategoriesTable categories={categories} />}

        <span className="flex items-center gap-2 text-primary-text">
          <FiTag />
          <span className={`${loading && "animate-pulse"}`}>
            Total de
            <span className="font-bold"> {categories.length} </span>
            Categorias
          </span>
        </span>
      </SectionCard>

      {openAddCategoryDialog && (
        <AddCategoryDialog close={() => setOpenAddCategoryDialog(false)} />
      )}
    </SectionContainer>
  );
}
