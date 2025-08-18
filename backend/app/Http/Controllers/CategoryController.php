<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

use Illuminate\Support\Facades\Auth;

use Illuminate\Http\JsonResponse;

use App\Repositories\CategoryRepository;

use App\Http\Requests\Category\CreateCategoryRequest;

use App\Http\Resources\Category\CategoryResource;

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
     * @return JsonResponse
     */
    public function list(): JsonResponse
    {
        $categories = $this->repository->getFromUser(Auth::user());

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
}
