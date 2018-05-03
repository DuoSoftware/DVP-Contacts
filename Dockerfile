#FROM ubuntu
#RUN apt-get update
#RUN apt-get install -y git nodejs npm nodejs-legacy
#RUN git clone https://github.com/DuoSoftware/DVP-Contacts.git /usr/local/src/contacts
#RUN cd /usr/local/src/contacts; npm install
#CMD ["nodejs", "/usr/local/src/contacts/app.js"]

#EXPOSE 8893

FROM node:9.9.0
ARG VERSION_TAG
RUN git clone -b $VERSION_TAG https://github.com/DuoSoftware/DVP-Contacts.git /usr/local/src/contacts
RUN cd /usr/local/src/contacts;
WORKDIR /usr/local/src/contacts
RUN npm install
EXPOSE 8893
CMD [ "node", "/usr/local/src/contacts/app.js" ]
