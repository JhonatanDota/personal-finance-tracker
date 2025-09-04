<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

use Illuminate\Support\Facades\Auth;

use App\Traits\CustomPaginate;

use App\Http\Filters\TransactionFilter;

use App\Repositories\TransactionRepository;

use App\Http\Resources\Transaction\TransactionResource;

class TransactionController extends Controller
{
    use CustomPaginate;

    private TransactionRepository $repository;

    public function __construct(TransactionRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Get transactions from current logged user.
     * @param TransactionFilter $filter
     * 
     * @return JsonResponse
     */
    public function list(TransactionFilter $filter): JsonResponse
    {
        $transactions = $this->repository->getFromUser(Auth::user(), $filter);

        return response()->json(
            $this->toSimplePaginateWithResource($transactions, TransactionResource::class)
        );
    }
}
