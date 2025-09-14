<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

use Illuminate\Support\Facades\Auth;

use App\Traits\CustomPaginate;

use App\Http\Filters\TransactionFilter;

use App\Repositories\TransactionRepository;

use App\Http\Resources\Transaction\TransactionResource;

use App\Http\Requests\Transaction\TransactionFilterRequest;
use App\Http\Requests\Transaction\CreateTransactionRequest;

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
     * @param TransactionFilterRequest $request
     * 
     * @return JsonResponse
     */
    public function list(TransactionFilterRequest $request): JsonResponse
    {
        $filter = new TransactionFilter($request); //TODO Checar a possibilidade de injeção de dependência ao invés de instanciar no controller
        $transactions = $this->repository->getFromUser(Auth::user(), $filter);

        return response()->json(
            $this->toSimplePaginateWithResource($transactions, TransactionResource::class)
        );
    }

    /**
     * Create a new transaction.
     * @param CreateTransactionRequest $request
     * 
     * @return JsonResponse
     */
    public function store(CreateTransactionRequest $request): JsonResponse
    {
        $transaction = $this->repository->create($request->validated());

        return response()->json(new TransactionResource($transaction), Response::HTTP_CREATED);
    }
}
