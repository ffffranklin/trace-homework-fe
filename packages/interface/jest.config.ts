export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    '\\.(scss|css|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/stub-transformer.js',
  }
};
