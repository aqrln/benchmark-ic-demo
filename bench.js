const Benchmark = require("benchmark");

function fn(x) {
  let y = 0;
  if (x.a !== undefined) {
    y += x.a;
  }
  if (x.b !== undefined) {
    y += x.b;
  }
  if (x.c !== undefined) {
    y += x.c;
  }
  if (x.d !== undefined) {
    y += x.d;
  }
}

new Benchmark.Suite()
  .add("first", () => {
    for (let i = 0; i < 1000; i++) {
      fn({ a: i, b: i, c: i, d: i });
    }
  })
  .add("second", () => {
    for (let i = 0; i < 100; i++) {
      fn({ a: i, c: i, d: i, b: i });
      fn({ b: i, d: i, a: i, c: i });
      fn({ b: i, c: i, d: i, a: i });

      let obj = {};
      if (i % 2 === 0) obj.a = i;
      if (i % 3 === 0) obj.b = i;
      if (i % 5 === 0) obj.c = i;
      if (i % 7 === 0) obj.d = i;
      fn(obj);
    }
  })
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .on("complete", function () {
    const fastest = this.filter("fastest");
    const slowest = this.filter("slowest");
    console.log(
      `${fastest.map("name")} is ${(
        slowest.map("stats.mean") / fastest.map("stats.mean")
      ).toFixed(2)} times faster than ${slowest.map("name")}`
    );
  })
  .run();
