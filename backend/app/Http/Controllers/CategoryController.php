<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use Illuminate\Http\JsonResponse;

use App\Repositories\CategoryRepository;

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

        return response()->json($categories);
    }
}
