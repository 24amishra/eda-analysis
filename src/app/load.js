import React from "react"

import { useState,useEffect } from "react";
import { useRouter } from 'next/navigation'
import {Table} from 'react-bootstrap';
import Head from "next/head";
import { Rock_Salt } from "next/font/google";
import { Inter } from "next/font/google";
import { data } from "jquery";
import { motion } from "motion/react";
import { ClipLoader } from "react-spinners";
export default function Spinner(){






return(

<div className=" container flex justify-center">
<ClipLoader color="#36d7b7" size={50} />

</div>



);
};

