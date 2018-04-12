FROM node:8.4.0

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .
ENV NODE_ENV=production

EXPOSE 3750
CMD ["yarn", "start"]
