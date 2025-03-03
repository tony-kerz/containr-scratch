#!/bin/bash

docker run \
    --rm \
    -u 1001 \
    \
    -e HOME=/home/runner \
    -e DEBUG=dbg:* \
    -e OUTPUT=out.json \
    -e CONFIGR_INPUT=/home/runner/work/gha-containr-scratch/gha-containr-scratch/configr.yaml \
    -e REGISTRY_CREDS=/home/runner/work/gha-containr-scratch/gha-containr-scratch/../_vol/home/.docker/config.json \
    -e CONTAINR_WORK_HOST=/home/runner/work/gha-containr-scratch/gha-containr-scratch \
    \
    -v /home/runner/work/gha-containr-scratch/gha-containr-scratch/configr.yaml:/home/runner/work/gha-containr-scratch/gha-containr-scratch/configr.yaml \
    -v /home/runner/work/gha-containr-scratch/gha-containr-scratch/../_vol/home/.docker/config.json:/home/runner/.docker/config.json \
    -v /home/runner/work/gha-containr-scratch/gha-containr-scratch:/tmp/containr/work \
    -v /var/run/docker.sock:/var/run/docker.sock \
    \
    -w /home/runner/work/gha-containr-scratch/gha-containr-scratchx \
    \
    containr-scratch