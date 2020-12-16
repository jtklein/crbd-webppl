import json
from bashplotlib.histogram import plot_hist

data = json.load(open('lambdaSamples.json'))
plot_hist(data, height=25, bincount=80, xlab=True, title="Lambda samples")

data = json.load(open('muSamples.json'))
plot_hist(data, height=25, bincount=80, xlab=True, title="Mu samples")