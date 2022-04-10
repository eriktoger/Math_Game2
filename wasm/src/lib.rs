use rand::distributions::{Distribution, Uniform};
use rand::seq::SliceRandom;
use serde_derive::Deserialize;
use serde_derive::Serialize;
use std::cmp;
use wasm_bindgen::prelude::*;

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
#[wasm_bindgen]
pub struct Operation {
    enabled: bool,
    firstEnd: u32,
    firstStart: u32,
    secondEnd: u32,
    secondStart: u32,
    usingTables: bool,
    tables: Vec<u32>,
}

#[derive(Serialize, Deserialize)]
pub struct Equation {
    first: u32,
    second: u32,
    operator: char,
    answer: u32,
}

#[wasm_bindgen]
pub fn generate_addition(addition: JsValue) -> JsValue {
    let mut rng = rand::thread_rng();
    let adds: Operation = addition.into_serde().unwrap();
    let first_value = Uniform::from(adds.firstStart..adds.firstEnd + 1);
    let second_value = Uniform::from(adds.secondStart..adds.secondEnd + 1);

    let first = first_value.sample(&mut rng);
    let second = second_value.sample(&mut rng);

    let equation = &Equation {
        first,
        second,
        operator: '+',
        answer: first + second,
    };

    return JsValue::from_serde(equation).unwrap();
}

#[wasm_bindgen]
pub fn generate_subtraction(subtraction: JsValue) -> JsValue {
    let mut rng = rand::thread_rng();
    let subs: Operation = subtraction.into_serde().unwrap();
    let first_value = Uniform::from(subs.firstStart..subs.firstEnd + 1);
    let second_value = Uniform::from(subs.secondStart..subs.secondEnd + 1);

    let first = first_value.sample(&mut rng);
    let second = second_value.sample(&mut rng);
    let largest = cmp::max(first, second);
    let smallest = cmp::min(first, second);
    let equation = &Equation {
        first: largest,
        second: smallest,
        operator: '-',
        answer: largest - smallest,
    };

    return JsValue::from_serde(equation).unwrap();
}

#[wasm_bindgen]
pub fn generate_multiplication(multiplication: JsValue) -> JsValue {
    let mut rng = rand::thread_rng();
    let mult: Operation = multiplication.into_serde().unwrap();

    let tables_length = mult.tables.len();
    if mult.usingTables && tables_length > 0 {
        let random_index = Uniform::from(0..tables_length);
        let random_table = mult.tables[random_index.sample(&mut rng)];
        let random_multiplier = Uniform::from(1..11).sample(&mut rng);

        let equation = &Equation {
            first: random_table,
            second: random_multiplier,
            operator: '*',
            answer: random_table * random_multiplier,
        };
        return JsValue::from_serde(equation).unwrap();
    }

    let first_value = Uniform::from(mult.firstStart..mult.firstEnd + 1);
    let second_value = Uniform::from(mult.secondStart..mult.secondEnd + 1);

    let first = first_value.sample(&mut rng);
    let second = second_value.sample(&mut rng);

    let equation = &Equation {
        first,
        second,
        operator: '*',
        answer: first * second,
    };

    return JsValue::from_serde(equation).unwrap();
}

#[wasm_bindgen]
pub fn generate_division(division: JsValue) -> JsValue {
    let mut rng = rand::thread_rng();
    let divs: Operation = division.into_serde().unwrap();

    let tables_length = divs.tables.len();
    if divs.usingTables && tables_length > 0 {
        let random_index = Uniform::from(0..tables_length);
        let random_table = divs.tables[random_index.sample(&mut rng)];
        let random_divider = Uniform::from(1..11).sample(&mut rng);

        let equation = &Equation {
            first: random_table * random_divider,
            second: random_table,
            operator: '/',
            answer: random_divider,
        };
        return JsValue::from_serde(equation).unwrap();
    }

    let first_value = Uniform::from(divs.firstStart..divs.firstEnd + 1);
    let second_value = Uniform::from(divs.secondStart..divs.secondEnd + 1);

    let first = first_value.sample(&mut rng);
    let second = second_value.sample(&mut rng);

    let largest = cmp::max(first, second);
    let smallest = cmp::min(first, second);
    let answer = largest / smallest;

    let equation = &Equation {
        first: answer * smallest,
        second: smallest,
        operator: '/',
        answer,
    };

    return JsValue::from_serde(equation).unwrap();
}

#[wasm_bindgen]
pub fn generate_order() -> JsValue {
    let mut rng = rand::thread_rng();
    let mut array: [usize; 24] = [0; 24];
    for i in 0..24 {
        array[i] = i;
    }
    array.shuffle(&mut rng);
    return JsValue::from_serde(&array).unwrap();
}
