<?php

namespace App\Repositories;

use App\Models\User;

use App\Enums\CategoryTypesEnum;

use App\Http\Filters\StatisticFilter;

class StatisticRepository
{
    /**
     * @param User $user
     * @param StatisticFilter $filter
     * 
     * @return array
     */
    public function getSummaryFromUser(User $user, StatisticFilter $filter): array
    {
        $expenseQuery = $user->expenseTransactions()->filter($filter);
        $incomeQuery = $user->incomeTransactions()->filter($filter);

        return [
            CategoryTypesEnum::EXPENSE->value => [
                'count' => $expenseQuery->count(),
                'total' => (float) $expenseQuery->sum('value'),
            ],

            CategoryTypesEnum::INCOME->value => [
                'count' => $incomeQuery->count(),
                'total' => (float) $incomeQuery->sum('value'),
            ]
        ];
    }

    /**
     * @param User $user
     * @param StatisticFilter $filter
     * 
     * @return array
     */
    public function getByCategoryFromUser(User $user, StatisticFilter $filter): array
    {
        $transactionsByCategory = $user->transactions()->with('category')->filter($filter)->get()->groupBy('category_id');
        $transactionsByCategoryMapped = $transactionsByCategory->map(function ($transactions) {
            $category = $transactions->first()->category;

            return [
                'id' => $category->id,
                'name' => $category->name,
                'count' => $transactions->count(),
                'total' => (float) $transactions->sum('value'),
            ];
        })->values()->toArray();

        return $transactionsByCategoryMapped;
    }
}
