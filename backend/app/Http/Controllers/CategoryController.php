<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

use Illuminate\Support\Facades\Auth;

use Illuminate\Http\JsonResponse;

use App\Repositories\CategoryRepository;

use App\Http\Filters\CategoryFilter;

use App\Http\Requests\Category\CategoryFilterRequest;
use App\Http\Requests\Category\CreateCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;

use App\Http\Resources\Category\CategoryResource;

use App\Models\Category;

class CategoryController extends Controller
{
    private CategoryRepository $repository;

    public function __construct(CategoryRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Get categories from current logged user.
     *
     * @param CategoryFilterRequest $request
     * @return JsonResponse
     */
    public function list(CategoryFilterRequest $request): JsonResponse
    {
        $filter = new CategoryFilter($request);

        $categories = $this->repository->getFromUser(Auth::user(), $filter);

        return response()->json(CategoryResource::collection($categories));
    }

    /**
     * Create Category.
     *
     * @param CreateCategoryRequest $request
     * @return JsonResponse
     */

    public function store(CreateCategoryRequest $request): JsonResponse
    {
        $inputs = $request->validated();

        $category = $this->repository->create($inputs);

        return response()->json(new CategoryResource($category), Response::HTTP_CREATED);
    }

    /**
     * Update Category.
     *
     * @param Category $category
     * @param UpdateCategoryRequest $request
     * @return JsonResponse
     */
    public function update(Category $category, UpdateCategoryRequest $request): JsonResponse
    {
        $inputs = $request->validated();

        $category = $this->repository->update($category, $inputs);

        return response()->json(new CategoryResource($category));
    }

    /**
     * Delete Category.
     *
     * @param Category $category
     * @return JsonResponse
     */
    public function destroy(Category $category): JsonResponse
    {
        $this->authorize('delete', $category);

        $category->delete();

        return response()->json(status: Response::HTTP_NO_CONTENT);
    }
}
