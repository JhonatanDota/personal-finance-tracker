<?php

namespace App\Enums;

enum CategoryTypesEnum: string
{
    case INCOME = 'INCOME';
    case EXPENSE = 'EXPENSE';

    /**
     * Get the values of the enum.
     *
     * @return array<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
