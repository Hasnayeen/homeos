<?php

namespace App\Enums;

enum TransactionType: string
{
    case INCOME = 'income';
    case EXPENSE = 'expense';
    case TRANSFER = 'transfer';
    case INVESTMENT = 'investment';
    case RETURN = 'return';

    public function getLabel(): string
    {
        return match ($this) {
            self::INCOME => 'Income',
            self::EXPENSE => 'Expense',
            self::TRANSFER => 'Transfer',
            self::INVESTMENT => 'Investment',
            self::RETURN => 'Return',
        };
    }

    public function getColor(): string|array|null
    {
        return match ($this) {
            self::INCOME => 'success',
            self::EXPENSE => 'danger',
            self::TRANSFER => 'info',
            self::INVESTMENT => 'warning',
            self::RETURN => 'success',
        };
    }

    public function getIcon(): ?string
    {
        return match ($this) {
            self::INCOME => 'heroicon-m-arrow-trending-up',
            self::EXPENSE => 'heroicon-m-arrow-trending-down',
            self::TRANSFER => 'heroicon-m-arrow-path',
            self::INVESTMENT => 'heroicon-m-banknotes',
            self::RETURN => 'heroicon-m-currency-dollar',
        };
    }

    public static function getOptions(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn (self $type) => [$type->value => $type->getLabel()])
            ->toArray();
    }
}
