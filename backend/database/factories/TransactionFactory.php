<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use Illuminate\Support\Carbon;

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
            'value' => $this->faker->randomFloat(nbMaxDecimals: 2, min: Transaction::VALUE_MIN, max: Transaction::VALUE_MAX),
            'description' => $this->faker->text(Transaction::DESCRIPTION_MAX_LENGTH),
            'date' => $this->faker->date(),
        ];
    }
    /**
     * Set the transaction date to BEFORE a given date.
     *
     * @param string
     * @return self
     */
    public function beforeDate(string $date): self
    {
        $end = Carbon::parse($date);
        $start = $end->copy()->subYear();

        return $this->state(fn() => [
            'date' => $this->faker->dateTimeBetween($start, $end)->format('Y-m-d'),
        ]);
    }

    /**
     * Set the transaction date to AFTER a given date.
     *
     * @param string
     * @return self
     */
    public function afterDate(string $date): self
    {
        $start = Carbon::parse($date);
        $end = $start->copy()->addYear();

        return $this->state(fn() => [
            'date' => $this->faker->dateTimeBetween($start, $end)->format('Y-m-d'),
        ]);
    }
}
