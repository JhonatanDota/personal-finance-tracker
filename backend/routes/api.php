<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\StatisticController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// =========================================================================
// Auth
// =========================================================================

Route::post('/auth', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::prefix('password')->group(function () {
    Route::post('/forgot', [AuthController::class, 'sendPasswordResetLink']);
    Route::post('/reset', [AuthController::class, 'resetPassword']);
});

Route::group(['middleware' => ['jwt.auth']], function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// =========================================================================
// Categories
// =========================================================================

Route::group(['middleware' => ['jwt.auth']], function () {
    Route::prefix('categories')->group(function () {
        Route::get('/', [CategoryController::class, 'list']);
        Route::post('/', [CategoryController::class, 'store']);
        Route::patch('/{category}', [CategoryController::class, 'update']);
        Route::delete('/{category}', [CategoryController::class, 'destroy']);
    });
});

// =========================================================================
// Transactions
// =========================================================================

Route::group(['middleware' => ['jwt.auth']], function () {
    Route::prefix('transactions')->group(function () {
        Route::get('/', [TransactionController::class, 'list']);
        Route::post('/', [TransactionController::class, 'store']);
        Route::patch('/{transaction}', [TransactionController::class, 'update']);
        Route::delete('/{transaction}', [TransactionController::class, 'destroy']);
    });
});

// =========================================================================
// Statistics
// =========================================================================

Route::group(['middleware' => ['jwt.auth']], function () {
    Route::prefix('statistics')->group(function () {
        Route::get('/summary', [StatisticController::class, 'summary']);
        Route::get('/by-category', [StatisticController::class, 'byCategory']);
    });
});
