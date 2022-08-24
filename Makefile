up: 
	skaffold dev

env: 
	kubectl create secret generic env-config --from-env-file=.env 

stan: 
	cd /boards/nats-test && kubectl port-forward 
	
controller:
	kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.2/deploy/static/provider/cloud/deploy.yaml