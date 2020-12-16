# crbd-webppl
Probabilistic programme to calculate speciation and extinction rate using a constant rate birth death model on a given phylogenetic tree

# To calculate
To start the calculation of the parameters with a quick analytical approach:
```
yarn start
```

To start the calculate of the parameters with a more exhaustive simulation approach:
```
yarn start-sim
```

Show a rough histogram of the samples (requires global python3 and bashplotlib)
```
yarn distribution
```

# CRBD model from
Probabilistic programming: a powerful new approach to statistical phylogenetics
 Fredrik Ronquist, Jan Kudlicka, Viktor Senderov, Johannes Borgström, Nicolas Lartillot, Daniel Lundén, Lawrence Murray, Thomas B. Schön, David Broman

doi: https://doi.org/10.1101/2020.06.16.154443

# Tree dataset from
Transitions between biomes are common and directional in Bombacoideae (Malvaceae)
 Zizka, Alexander;  Carvalho-Sobrinho, Jefferson;  Pennington, Toby R.; Queiroz, Luciano; Alcantara, Suzana; Baum, David;  Bacon, Christine D.;  Antonelli, Alexandre

https://zenodo.org/record/2634308#.X9jYwWRKj0u

Tree was converted with nexus2phyjson (compiled from the repository)‚