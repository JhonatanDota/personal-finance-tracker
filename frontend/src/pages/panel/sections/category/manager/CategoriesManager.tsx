import { useState, useEffect } from "react";

import { TABLE_PAGINATION_DELAY_MS } from "../../../../../constants/delay";

import { getCategories } from "../../../../../requests/categoryRequests";
import { handleErrors } from "../../../../../requests/handleErrors";

import { CategoryModel } from "../../../../../models/categoryModels";

import { GoGear } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import { MdOutlineFilterList } from "react-icons/md";

import Loader from "../../../components/misc/Loader";
import SectionContainer from "../../../components/section/SectionContainer";
import SectionTitle from "../../../components/section/SectionTitle";
import SectionSubtitle from "../../../components/section/SectionSubtitle";
import SectionCard from "../../../components/section/SectionCard";
import SectionCardTitle from "../../../components/section/SectionCardTitle";
import CategoriesFilters from "./CategoriesFilters";
import CategoriesTable from "./CategoriesTable";
import AddCategoryDialog from "./actions/AddCategoryDialog";

export default function CategoriesManager() {
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filteredCategories, setFilteredCategories] = useState<CategoryModel[]>(
    []
  );

  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);

  async function fetchCategories() {
    setLoading(true);

    try {
      const [response] = await Promise.all([
        getCategories(),
        new Promise((resolve) =>
          setTimeout(resolve, TABLE_PAGINATION_DELAY_MS)
        ),
      ]);

      setCategories(response.data);
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  }

  function applyFilters() {
    let filteredCategories = categories;

    if (filters.name) {
      filteredCategories = filteredCategories.filter((category) =>
        category.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.type) {
      filteredCategories = filteredCategories.filter(
        (category) => category.type === filters.type
      );
    }

    setFilteredCategories(filteredCategories);
  }

  useEffect(() => {
    applyFilters();
  }, [filters, categories]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <SectionContainer>
      <SectionTitle title="Gerenciar Categorias" />
      <SectionSubtitle title="Crie, edite e organize suas categorias de receitas e despesas" />

      <SectionCard>
        <SectionCardTitle
          icon={<MdOutlineFilterList className="w-6 h-6 text-success" />}
          title="Filtros"
        />
        <CategoriesFilters setFilters={setFilters} />
      </SectionCard>

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

        {loading ? (
          <Loader />
        ) : (
          <CategoriesTable
            categories={filteredCategories}
            setCategories={setCategories}
          />
        )}

        <span className="flex items-center gap-2 text-primary-text text-sm">
          <span className={`${loading && "animate-pulse"}`}>
            Total de
            <span className="font-bold"> {filteredCategories.length} </span>
            Categoria(s)
          </span>
        </span>
      </SectionCard>

      {openAddCategoryDialog && (
        <AddCategoryDialog
          onAdd={(category: CategoryModel) => {
            setCategories([...categories, category]);
          }}
          close={() => setOpenAddCategoryDialog(false)}
        />
      )}
    </SectionContainer>
  );
}
