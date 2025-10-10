<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TransactionController;

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
        Route::delete('/{transaction}', [TransactionController::class, 'destroy']);
    });
});
