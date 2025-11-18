<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Repositories\StatisticRepository;

use App\Http\Filters\StatisticFilter;

use App\Http\Requests\Statistic\SummaryRequest;


class StatisticController extends Controller
{
    private StatisticRepository $repository;

    public function __construct(StatisticRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Get summary of current logged user.
     * 
     * @param SummaryRequest $request
     * 
     * @return JsonResponse
     */
    public function summary(SummaryRequest $request)
    {
        $statisticFilter = new StatisticFilter($request);

        $sumary = $this->repository->getSummaryFromUser(Auth::user(), $statisticFilter);

        return response()->json($sumary);
    }
}
