FROM public.ecr.aws/lambda/nodejs:18
RUN npm install -g yarn
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn compile
