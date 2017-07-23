 <﻿# HIBC-Barcode-Parser
Parses Code 128 Barcode values using the HIBC Modulo 43 standard. The barcode parser verifies the
"data" contained in the barcode text by validating the value calculated from the message contents, against
a "check digit" embedded within the message.

### Use Cases
The most common use cases are patient armband and healthcare product scanning. The check-digit verification ensures that the message contained is complete. Theoretically, this is in much the same way that we use the checksum validation in computer data files.

### This Project is NOT affiliated with The HIBCC®
For information on the Health Industry Business Communications Council, please visit their <a href="http://www.hibcc.org" target="_blank">website</a>.
