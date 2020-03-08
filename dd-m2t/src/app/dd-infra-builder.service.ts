import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DdInfraBuilderService {

  constructor() { }

  buildCommon(): Blob{

    var dockerComposeFile = new Blob(["version: '3.1'\n",
                            "services:\n",
                            "  mongo:\n",
                            "    image: mongo\n",
                            "    restart: always\n",
                            "    ports:\n",
                            "      - 27017:27017\n",
                            "    environment:\n",
                            "      MONGO_INITDB_ROOT_USERNAME: user\n",
                            "      MONGO_INITDB_ROOT_PASSWORD: pass\n"], {type: "text/plain;charset=utf-8"});


    return dockerComposeFile;

  }
}