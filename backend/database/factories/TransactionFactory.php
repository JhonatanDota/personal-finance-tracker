<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Category;
use App\Models\Transaction;

class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'category_id' => Category::factory(),
            'name' => $this->faker->text(Transaction::NAME_MAX_LENGTH),
            'value' => $this->faker->randomFloat(min: Transaction::VALUE_MIN, max: Transaction::VALUE_MAX),
            'description' => $this->faker->text(Transaction::DESCRIPTION_MAX_LENGTH),
            'date' => $this->faker->date(),
        ];
    }
}
