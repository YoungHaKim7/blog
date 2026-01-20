---
title: 260120_egui_hello_world
published: 2026-01-20
description: 'egui basic 01 (hello world)'
image: ''
tags: [GUI, rust]
category: 'rust_GUI'
draft: false 
lang: ''
---

# link

<hr />

# egui: an easy-to-use immediate mode GUI in Rust that runs on both web and native
- https://github.com/emilk/egui

# egui basic

- image가 잘 불러와 지게 egui_extras를 추가해 주었다.

```toml
[dependencies]
eframe  = "0.33.3"
env_logger = "0.11.8"
egui_extras = { version = "0.33.3", features = ["image"] }

```

- 런타임에서 디버깅 하기 `cargo r --release`

```bash
$ RUST_LOG=debug cargo r --release
```

## entry point `main.rs`

```rs
use eframe::egui;

mod app;

use crate::app::windows::MyApp;

// Short for `Result<T, eframe::Error>`.
fn main() -> eframe::Result {

    env_logger::init(); // Log to stderr (if you run with `RUST_LOG=debug`).
    let options = eframe::NativeOptions {
        viewport: egui::ViewportBuilder::default().with_inner_size([320.0, 240.0]),
        ..Default::default()
    };
    eframe::run_native(
        "My egui App",
        options,
        Box::new(|cc| {
            // This gives us image support:
            egui_extras::install_image_loaders(&cc.egui_ctx);

            Ok(Box::<MyApp>::default())
        }),
    )
}


```

- `src/app/mod.rs`


```rs
use eframe::egui;

pub struct MyApp {
    name: String,
    age: u32,
}

impl Default for MyApp {
    fn default() -> Self {
        Self {
            name: "Arthur".to_owned(),
            age: 42,
        }
    }
}

impl eframe::App for MyApp {
    fn update(&mut self, ctx: &egui::Context, _frame: &mut eframe::Frame) {
        egui::CentralPanel::default().show(ctx, |ui| {
            ui.heading("My egui Application");
            ui.horizontal(|ui| {
                let name_label = ui.label("Your name: ");
                ui.text_edit_singleline(&mut self.name)
                    .labelled_by(name_label.id);
            });
            ui.add(egui::Slider::new(&mut self.age, 0..=120).text("age"));
            if ui.button("Increment").clicked() {
                self.age += 1;
            }
            ui.label(format!("Hello '{}', age {}", self.name, self.age));

            ui.image(egui::include_image!("../../assets/imgs/ferris.png"));
        });
    }
}
```

