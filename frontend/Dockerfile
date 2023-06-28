FROM --platform=$BUILDPLATFORM node:lts AS development

WORKDIR /frontend
COPY . /frontend/

RUN npm ci

ENV CI=false
ENV PORT=3000

CMD [ "npm", "start" ]

