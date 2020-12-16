var tree = phyjs.read_phyjson("bombac.phyjson")
phyjs.print_tree(tree)
var model = function() {
    var lambda = exponential({a: 1})
    var epsilon = uniform({a: 0.0, b: 1.0})
    var mu = epsilon*lambda

    factor( exactCRBDLikelihoodComplete(tree, lambda, mu) )

    return [lambda, mu]
}

var dist = Infer({model, method: 'MCMC', samples: 1000, lag: 10, burn: 1000})
display(dist)
