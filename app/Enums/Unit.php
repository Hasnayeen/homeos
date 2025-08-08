<?php

namespace App\Enums;

enum Unit: string
{
    case PIECE = 'piece';
    case PIECES = 'pieces';
    case BOTTLE = 'bottle';
    case BOTTLES = 'bottles';
    case CAN = 'can';
    case CANS = 'cans';
    case BOX = 'box';
    case BOXES = 'boxes';
    case PACK = 'pack';
    case PACKS = 'packs';
    case BAG = 'bag';
    case BAGS = 'bags';
    case TUBE = 'tube';
    case TUBES = 'tubes';
    case ROLL = 'roll';
    case ROLLS = 'rolls';

    // Weight units
    case GRAM = 'g';
    case GRAMS = 'grams';
    case KILOGRAM = 'kg';
    case KILOGRAMS = 'kilograms';
    case POUND = 'lb';
    case POUNDS = 'pounds';
    case OUNCE = 'oz';
    case OUNCES = 'ounces';

    // Volume units
    case MILLILITER = 'ml';
    case MILLILITERS = 'milliliters';
    case LITER = 'l';
    case LITERS = 'liters';
    case FLUID_OUNCE = 'fl oz';
    case FLUID_OUNCES = 'fluid ounces';
    case CUP = 'cup';
    case CUPS = 'cups';
    case PINT = 'pint';
    case PINTS = 'pints';
    case QUART = 'quart';
    case QUARTS = 'quarts';
    case GALLON = 'gallon';
    case GALLONS = 'gallons';

    // Length units
    case METER = 'm';
    case METERS = 'meters';
    case CENTIMETER = 'cm';
    case CENTIMETERS = 'centimeters';
    case FOOT = 'ft';
    case FEET = 'feet';
    case INCH = 'in';
    case INCHES = 'inches';

    // Common household units
    case TABLET = 'tablet';
    case TABLETS = 'tablets';
    case CAPSULE = 'capsule';
    case CAPSULES = 'capsules';
    case DOSE = 'dose';
    case DOSES = 'doses';
    case SHEET = 'sheet';
    case SHEETS = 'sheets';
    case STICK = 'stick';
    case STICKS = 'sticks';
    case PORTION = 'portion';
    case PORTIONS = 'portions';
    case SERVING = 'serving';
    case SERVINGS = 'servings';

    public function getLabel(): string
    {
        return str($this->value)->title();
    }

    public function getColor(): string|array|null
    {
        return match ($this) {
            self::PIECE, self::PIECES, self::TABLET, self::TABLETS, self::CAPSULE, self::CAPSULES,
            self::DOSE, self::DOSES, self::SHEET, self::SHEETS, self::STICK, self::STICKS => 'primary',

            self::BOTTLE, self::BOTTLES, self::CAN, self::CANS, self::BOX, self::BOXES,
            self::PACK, self::PACKS, self::BAG, self::BAGS, self::TUBE, self::TUBES,
            self::ROLL, self::ROLLS => 'info',

            self::GRAM, self::GRAMS, self::KILOGRAM, self::KILOGRAMS, self::POUND, self::POUNDS,
            self::OUNCE, self::OUNCES => 'warning',

            self::MILLILITER, self::MILLILITERS, self::LITER, self::LITERS, self::FLUID_OUNCE,
            self::FLUID_OUNCES, self::CUP, self::CUPS, self::PINT, self::PINTS, self::QUART,
            self::QUARTS, self::GALLON, self::GALLONS => 'gray',

            self::METER, self::METERS, self::CENTIMETER, self::CENTIMETERS, self::FOOT,
            self::FEET, self::INCH, self::INCHES => 'success',

            self::PORTION, self::PORTIONS, self::SERVING, self::SERVINGS => 'danger',
        };
    }

    public function getIcon(): ?string
    {
        return match ($this) {
            self::PIECE, self::PIECES, self::TABLET, self::TABLETS, self::CAPSULE, self::CAPSULES,
            self::DOSE, self::DOSES, self::SHEET, self::SHEETS, self::STICK, self::STICKS => 'heroicon-m-squares-2x2',

            self::BOTTLE, self::BOTTLES => 'heroicon-m-beaker',
            self::CAN, self::CANS => 'heroicon-m-circle-stack',
            self::BOX, self::BOXES => 'heroicon-m-cube',
            self::PACK, self::PACKS, self::BAG, self::BAGS => 'heroicon-m-archive-box',
            self::TUBE, self::TUBES => 'heroicon-m-minus',
            self::ROLL, self::ROLLS => 'heroicon-m-circle-stack',

            self::GRAM, self::GRAMS, self::KILOGRAM, self::KILOGRAMS, self::POUND, self::POUNDS,
            self::OUNCE, self::OUNCES => 'heroicon-m-scale',

            self::MILLILITER, self::MILLILITERS, self::LITER, self::LITERS, self::FLUID_OUNCE,
            self::FLUID_OUNCES, self::CUP, self::CUPS, self::PINT, self::PINTS, self::QUART,
            self::QUARTS, self::GALLON, self::GALLONS => 'heroicon-m-beaker',

            self::METER, self::METERS, self::CENTIMETER, self::CENTIMETERS, self::FOOT,
            self::FEET, self::INCH, self::INCHES => 'heroicon-m-calculator',

            self::PORTION, self::PORTIONS, self::SERVING, self::SERVINGS => 'heroicon-m-cake',
        };
    }

    public static function getOptions(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn (self $unit) => [$unit->value => $unit->value])
            ->toArray();
    }

    public static function getGroupedOptions(): array
    {
        return [
            'Count' => [
                self::PIECE->value => self::PIECE->getLabel(),
                self::PIECES->value => self::PIECES->getLabel(),
                self::TABLET->value => self::TABLET->getLabel(),
                self::TABLETS->value => self::TABLETS->getLabel(),
                self::CAPSULE->value => self::CAPSULE->getLabel(),
                self::CAPSULES->value => self::CAPSULES->getLabel(),
                self::DOSE->value => self::DOSE->getLabel(),
                self::DOSES->value => self::DOSES->getLabel(),
                self::SHEET->value => self::SHEET->getLabel(),
                self::SHEETS->value => self::SHEETS->getLabel(),
                self::STICK->value => self::STICK->getLabel(),
                self::STICKS->value => self::STICKS->getLabel(),
            ],
            'Containers' => [
                self::BOTTLE->value => self::BOTTLE->getLabel(),
                self::BOTTLES->value => self::BOTTLES->getLabel(),
                self::CAN->value => self::CAN->getLabel(),
                self::CANS->value => self::CANS->getLabel(),
                self::BOX->value => self::BOX->getLabel(),
                self::BOXES->value => self::BOXES->getLabel(),
                self::PACK->value => self::PACK->getLabel(),
                self::PACKS->value => self::PACKS->getLabel(),
                self::BAG->value => self::BAG->getLabel(),
                self::BAGS->value => self::BAGS->getLabel(),
                self::TUBE->value => self::TUBE->getLabel(),
                self::TUBES->value => self::TUBES->getLabel(),
                self::ROLL->value => self::ROLL->getLabel(),
                self::ROLLS->value => self::ROLLS->getLabel(),
            ],
            'Weight' => [
                self::GRAM->value => self::GRAM->getLabel(),
                self::GRAMS->value => self::GRAMS->getLabel(),
                self::KILOGRAM->value => self::KILOGRAM->getLabel(),
                self::KILOGRAMS->value => self::KILOGRAMS->getLabel(),
                self::POUND->value => self::POUND->getLabel(),
                self::POUNDS->value => self::POUNDS->getLabel(),
                self::OUNCE->value => self::OUNCE->getLabel(),
                self::OUNCES->value => self::OUNCES->getLabel(),
            ],
            'Volume' => [
                self::MILLILITER->value => self::MILLILITER->getLabel(),
                self::MILLILITERS->value => self::MILLILITERS->getLabel(),
                self::LITER->value => self::LITER->getLabel(),
                self::LITERS->value => self::LITERS->getLabel(),
                self::FLUID_OUNCE->value => self::FLUID_OUNCE->getLabel(),
                self::FLUID_OUNCES->value => self::FLUID_OUNCES->getLabel(),
                self::CUP->value => self::CUP->getLabel(),
                self::CUPS->value => self::CUPS->getLabel(),
                self::PINT->value => self::PINT->getLabel(),
                self::PINTS->value => self::PINTS->getLabel(),
                self::QUART->value => self::QUART->getLabel(),
                self::QUARTS->value => self::QUARTS->getLabel(),
                self::GALLON->value => self::GALLON->getLabel(),
                self::GALLONS->value => self::GALLONS->getLabel(),
            ],
            'Length' => [
                self::METER->value => self::METER->getLabel(),
                self::METERS->value => self::METERS->getLabel(),
                self::CENTIMETER->value => self::CENTIMETER->getLabel(),
                self::CENTIMETERS->value => self::CENTIMETERS->getLabel(),
                self::FOOT->value => self::FOOT->getLabel(),
                self::FEET->value => self::FEET->getLabel(),
                self::INCH->value => self::INCH->getLabel(),
                self::INCHES->value => self::INCHES->getLabel(),
            ],
            'Food & Portions' => [
                self::PORTION->value => self::PORTION->getLabel(),
                self::PORTIONS->value => self::PORTIONS->getLabel(),
                self::SERVING->value => self::SERVING->getLabel(),
                self::SERVINGS->value => self::SERVINGS->getLabel(),
            ],
        ];
    }
}
