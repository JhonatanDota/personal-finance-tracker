<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Repositories\StatisticRepository;

use App\Http\Filters\StatisticFilter;

use App\Http\Requests\Statistic\SummaryRequest;
use App\Http\Requests\Statistic\ByCategoryRequest;

class StatisticController extends Controller
{
    private StatisticRepository $repository;

    public function __construct(StatisticRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param SummaryRequest $request
     * 
     * @return JsonResponse
     */
    public function summary(SummaryRequest $request)
    {
        $statisticFilter = new StatisticFilter($request);

        $summary = $this->repository->getSummaryFromUser(Auth::user(), $statisticFilter);

        return response()->json($summary);
    }

    /**
     * @param ByCategoryRequest $request.
     * 
     * @return JsonResponse
     */
    public function byCategory(ByCategoryRequest $request)
    {
        $statisticFilter = new StatisticFilter($request);

        $category = $this->repository->getByCategoryFromUser(Auth::user(), $statisticFilter);

        return response()->json($category);
    }
}
