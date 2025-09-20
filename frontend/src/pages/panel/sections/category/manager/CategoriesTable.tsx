import { CategoryModel } from "../../../../../models/categoryModels";

import { CategoryTypeTag } from "../CategoryTypeTag";

import Table from "../../../components/table/Table";
import TableHeader from "../../../components/table/TableHeader";
import TableRow from "../../../components/table/TableRow";
import TableHead from "../../../components/table/TableHead";
import TableCell from "../../../components/table/TableCell";
import TableBody from "../../../components/table/TableBody";

type CategoriesTableProps = {
  categories: CategoryModel[];
};

export default function CategoriesTable(props: CategoriesTableProps) {
  const { categories } = props;

  return (
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
            <TableCell>
              <CategoryTypeTag type={category.type} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
