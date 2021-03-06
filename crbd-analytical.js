/**
 * Load the tree file
 */
var tree = phyjs.read_phyjson('bombac.phyjson');
phyjs.print_tree(tree);

/**
 * Model specification
 */
var model = function () {
  var lambda = exponential({ a: 1 });
  var epsilon = uniform({ a: 0.0, b: 1.0 });
  var mu = epsilon * lambda;

  factor(exactCRBDLikelihoodComplete(tree, lambda, mu));

  return [lambda, mu];
};

/**
 * Inference
 * The length parameters of the MCMC chain can be changed here
 */
var dist = Infer({ model, method: 'MCMC', samples: 10000, lag: 10, burn: 1000 });
display(dist.samples);

/**
 * Extract and display the values for lambda and mu from the inference results
 */
var lambdaExtractor = function (x) {
  return x.value[0];
};
var lambdaSamples = map(lambdaExtractor, dist.samples);

var muExtractor = function (x) {
  return x.value[1];
};
var muSamples = map(muExtractor, dist.samples);

var displayValues = function (array) {
  display('computed mean');
  display(listMean(array));
  display('computed variance');
  display(listVar(array));
  display('computed standard deviation');
  display(listStdev(array));
  display('');
}
display('lambda:')
displayValues(lambdaSamples);
display('mu:');
displayValues(muSamples);

// Write data:
json.write('lambdaSamples.json', lambdaSamples);
json.write('muSamples.json', muSamples);
