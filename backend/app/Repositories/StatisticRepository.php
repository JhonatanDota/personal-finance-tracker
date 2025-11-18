<?php

namespace App\Repositories;

use App\Models\User;

use App\Enums\CategoryTypesEnum;

use App\Http\Filters\StatisticFilter;

class StatisticRepository
{
    public function getSummaryFromUser(User $user, StatisticFilter $filter)
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
}
