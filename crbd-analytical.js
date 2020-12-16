var tree = phyjs.read_phyjson('bombac.phyjson');
phyjs.print_tree(tree);
tree;

var model = function () {
  var lambda = exponential({ a: 1 });
  var epsilon = uniform({ a: 0.0, b: 1.0 });
  var mu = epsilon * lambda;

  factor(exactCRBDLikelihoodComplete(tree, lambda, mu));

  return [lambda, mu];
};

var dist = Infer({ model, method: 'MCMC', samples: 1000, lag: 10, burn: 1000 });
display(dist);

var lambdaExtractor = function (x) {
  return x.value[0];
};
var lambdas = map(lambdaExtractor, dist.samples);

var muExtractor = function (x) {
  return x.value[1];
};
var mus = map(muExtractor, dist.samples);

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
displayValues(lambdas);
display('mu:');
displayValues(mus);

// Write data:
json.write('calc.json', dist.samples);
