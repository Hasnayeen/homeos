<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;

enum Unit: string implements HasLabel, HasColor, HasIcon
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
        return $this->value;
    }

    public function getColor(): string | array | null
    {
        return match($this) {
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
        return match($this) {
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
            ->mapWithKeys(fn(self $unit) => [$unit->value => $unit->value])
            ->toArray();
    }
    
    public static function getGroupedOptions(): array
    {
        return [
            'Count' => [
                self::PIECE->value => self::PIECE->value,
                self::PIECES->value => self::PIECES->value,
                self::TABLET->value => self::TABLET->value,
                self::TABLETS->value => self::TABLETS->value,
                self::CAPSULE->value => self::CAPSULE->value,
                self::CAPSULES->value => self::CAPSULES->value,
                self::DOSE->value => self::DOSE->value,
                self::DOSES->value => self::DOSES->value,
                self::SHEET->value => self::SHEET->value,
                self::SHEETS->value => self::SHEETS->value,
                self::STICK->value => self::STICK->value,
                self::STICKS->value => self::STICKS->value,
            ],
            'Containers' => [
                self::BOTTLE->value => self::BOTTLE->value,
                self::BOTTLES->value => self::BOTTLES->value,
                self::CAN->value => self::CAN->value,
                self::CANS->value => self::CANS->value,
                self::BOX->value => self::BOX->value,
                self::BOXES->value => self::BOXES->value,
                self::PACK->value => self::PACK->value,
                self::PACKS->value => self::PACKS->value,
                self::BAG->value => self::BAG->value,
                self::BAGS->value => self::BAGS->value,
                self::TUBE->value => self::TUBE->value,
                self::TUBES->value => self::TUBES->value,
                self::ROLL->value => self::ROLL->value,
                self::ROLLS->value => self::ROLLS->value,
            ],
            'Weight' => [
                self::GRAM->value => self::GRAM->value,
                self::GRAMS->value => self::GRAMS->value,
                self::KILOGRAM->value => self::KILOGRAM->value,
                self::KILOGRAMS->value => self::KILOGRAMS->value,
                self::POUND->value => self::POUND->value,
                self::POUNDS->value => self::POUNDS->value,
                self::OUNCE->value => self::OUNCE->value,
                self::OUNCES->value => self::OUNCES->value,
            ],
            'Volume' => [
                self::MILLILITER->value => self::MILLILITER->value,
                self::MILLILITERS->value => self::MILLILITERS->value,
                self::LITER->value => self::LITER->value,
                self::LITERS->value => self::LITERS->value,
                self::FLUID_OUNCE->value => self::FLUID_OUNCE->value,
                self::FLUID_OUNCES->value => self::FLUID_OUNCES->value,
                self::CUP->value => self::CUP->value,
                self::CUPS->value => self::CUPS->value,
                self::PINT->value => self::PINT->value,
                self::PINTS->value => self::PINTS->value,
                self::QUART->value => self::QUART->value,
                self::QUARTS->value => self::QUARTS->value,
                self::GALLON->value => self::GALLON->value,
                self::GALLONS->value => self::GALLONS->value,
            ],
            'Length' => [
                self::METER->value => self::METER->value,
                self::METERS->value => self::METERS->value,
                self::CENTIMETER->value => self::CENTIMETER->value,
                self::CENTIMETERS->value => self::CENTIMETERS->value,
                self::FOOT->value => self::FOOT->value,
                self::FEET->value => self::FEET->value,
                self::INCH->value => self::INCH->value,
                self::INCHES->value => self::INCHES->value,
            ],
            'Food & Portions' => [
                self::PORTION->value => self::PORTION->value,
                self::PORTIONS->value => self::PORTIONS->value,
                self::SERVING->value => self::SERVING->value,
                self::SERVINGS->value => self::SERVINGS->value,
            ],
        ];
    }
}