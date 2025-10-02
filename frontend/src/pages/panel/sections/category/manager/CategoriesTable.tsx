import { useState } from "react";

import { CategoryModel } from "../../../../../models/categoryModels";

import CategoryTypeTag from "../CategoryTypeTag";

import { MdEdit, MdDeleteOutline } from "react-icons/md";

import UpdateCategoryDialog from "./actions/UpdateCategoryDialog";
import DeleteCategoryDialog from "./actions/DeleteCategoryDialog";

import Table from "../../../components/table/Table";
import TableHeader from "../../../components/table/TableHeader";
import TableRow from "../../../components/table/TableRow";
import TableHead from "../../../components/table/TableHead";
import TableCell from "../../../components/table/TableCell";
import TableBody from "../../../components/table/TableBody";

type CategoriesTableProps = {
  categories: CategoryModel[];
  setCategories: (categories: CategoryModel[]) => void;
};

export default function CategoriesTable(props: CategoriesTableProps) {
  const { categories, setCategories } = props;

  const [openDeleteCategoryDialog, setOpenDeleteCategoryDialog] =
    useState(false);
  const [categoryToDelete, setCategoryToDelete] =
    useState<CategoryModel | null>(null);

  const [openUpdateCategoryDialog, setOpenUpdateCategoryDialog] =
    useState(false);
  const [categoryToUpdate, setCategoryToUpdate] =
    useState<CategoryModel | null>(null);

  function handleDeleteCategoryDialog(category: CategoryModel) {
    setOpenDeleteCategoryDialog(true);
    setCategoryToDelete(category);
  }

  function handleDeletedCategory(deletedCategory: CategoryModel) {
    setCategories(
      categories.filter((category) => category.id !== deletedCategory.id)
    );
  }

  function handleUpdateCategoryDialog(category: CategoryModel) {
    setOpenUpdateCategoryDialog(true);
    setCategoryToUpdate(category);
  }

  function handleUpdatedCategory(updatedCategory: CategoryModel) {
    const updatedCategories = categories.map((category) =>
      category.id === updatedCategory.id ? updatedCategory : category
    );

    setCategories(updatedCategories);
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="w-24">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <CategoryTypeTag type={category.type} />
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateCategoryDialog(category)}
                    className="button-action-table"
                  >
                    <MdEdit className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteCategoryDialog(category)}
                    className="button-action-table"
                  >
                    <MdDeleteOutline className="w-5 h-5 fill-error" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {openDeleteCategoryDialog && categoryToDelete && (
        <DeleteCategoryDialog
          category={categoryToDelete}
          close={() => setOpenDeleteCategoryDialog(false)}
          onDelete={handleDeletedCategory}
        />
      )}

      {openUpdateCategoryDialog && categoryToUpdate && (
        <UpdateCategoryDialog
          category={categoryToUpdate}
          close={() => setOpenUpdateCategoryDialog(false)}
          onUpdate={handleUpdatedCategory}
        />
      )}
    </>
  );
}
