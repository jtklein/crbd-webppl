/**
 * Load the tree file
 */
var tree = phyjs.read_phyjson('bombac.phyjson');
phyjs.print_tree(tree);
tree;

var MAX_LAMBDA = 5;
var MAX_DIV = 5;

/**
 * Model specification
 */
var model = function () {
  // Define priors on lambda and mu
  var lambda = exponential({ a: 1 });
  var epsilon = uniform({ a: 0.0, b: 1.0 });
  var mu = epsilon * lambda;
  var rho = 0.59;

  // Simulate conditionally on the tree
  // It returns all variables of interest
  var ret = simCRBDNaive(tree, lambda, mu, rho);

  // Condition on detection
  // var dist = Infer({
  //   model: function () {
  //     crbdGoesUndetected(tree.age, lambda, mu, rho);
  //   },
  //   method: 'forward',
  //   samples: 100,
  // });
  // factor(-2.0 * dist.score(false));

  return ret;
};

/**
 * Inference
 * tweak the number of particles if you want to
 **/
var particles = 1000;
var dist = Infer({ method: 'SMC', particles: particles, model: model });
// display(dist)
// display(dist.getDist())
// display(dist.samples);

var pair = function(x, y) {
  display(y.val);
  var key = dist.normalizationConstant;
  json.write('lambdaSamples.json', { [key]: y.val });
  return x;
};
var values2 = mapObject(pair, dist.getDist()); // => {a: ['a', 1], b: ['b', 2]}
// display(values2)
// /**
//  * Extract and display the values for lambda and mu from the inference results
//  */
// var lambdaExtractor = function (x) {
//   return x.value[0];
// };
// var lambdaSamples = map(lambdaExtractor, dist.samples);

// var muExtractor = function (x) {
//   return x.value[1];
// };
// var muSamples = map(muExtractor, dist.samples);

// var displayValues = function (array) {
//   display('computed mean');
//   display(listMean(array));
//   display('computed variance');
//   display(listVar(array));
//   display('computed standard deviation');
//   display(listStdev(array));
//   display('');
// };
// display('lambda:');
// displayValues(lambdaSamples);
// display('mu:');
// displayValues(muSamples);

// // Write data:
// json.write('lambdaSamples.json', values2);
// json.write('muSamples.json', muSamples[0]);
