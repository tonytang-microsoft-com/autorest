﻿// Copyright (c) Microsoft Open Technologies, Inc. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Rest.Generator.Azure;
using Microsoft.Rest.Generator.ClientModel;
using Microsoft.Rest.Generator.CSharp.Azure.Properties;
using Microsoft.Rest.Generator.CSharp.TemplateModels;
using Microsoft.Rest.Generator.Utilities;
using System.Globalization;

namespace Microsoft.Rest.Generator.CSharp.Azure
{
    public class AzureMethodTemplateModel : MethodTemplateModel
    {
        public AzureMethodTemplateModel(Method source, ServiceClient serviceClient)
            : base(source, serviceClient)
        {
            if (source == null)
            {
                throw new ArgumentNullException("source");
            }

            ParameterTemplateModels.Clear();
            source.Parameters.ForEach(p => ParameterTemplateModels.Add(new AzureParameterTemplateModel(p)));

            if (MethodGroupName != ServiceClient.Name)
            {
                MethodGroupName = MethodGroupName + "Operations";
            }
        }

        public AzureMethodTemplateModel GetMethod
        {
            get
            {
                var getMethod = ServiceClient.Methods.FirstOrDefault(m => m.Url == Url
                                                                          && m.HttpMethod == HttpMethod.Get &&
                                                                          m.Group == Group);
                if (getMethod == null)
                {
                    throw new InvalidOperationException(
                        string.Format(CultureInfo.InvariantCulture,
                        Resources.InvalidLongRunningOperationForCreateOrUpdate,
                            Name, Group));
                }
                return new AzureMethodTemplateModel(getMethod, ServiceClient);
            }
        }

        /// <summary>
        /// Get the expression for exception initialization with message.
        /// </summary>
        public override string InitializeExceptionWithMessage
        {
            get
            {
                if (DefaultResponse != null && DefaultResponse.Name == "CloudError")
                {
                    return "ex = new CloudException(errorBody.Message);";
                }
                return base.InitializeExceptionWithMessage;
            }
        }

        /// <summary>
        /// Returns true if method has x-ms-long-running-operation extension.
        /// </summary>
        public bool IsLongRunningOperation
        {
            get { return Extensions.ContainsKey(AzureCodeGenerator.LongRunningExtension); }
        }

        /// <summary>
        /// Returns AzureOperationResponse generic type declaration.
        /// </summary>
        public override string OperationResponseReturnTypeString
        {
            get
            {
                if (ReturnType != null)
                {
                    return string.Format(CultureInfo.InvariantCulture,
                        "AzureOperationResponse<{0}>", ReturnType.Name);
                }
                else
                {
                    return "AzureOperationResponse";
                }
            }
        }

        /// <summary>
        /// Get the type for operation exception.
        /// </summary>
        public override string OperationExceptionTypeString
        {
            get
            {
                if (DefaultResponse == null || DefaultResponse.Name == "CloudError")
                {
                    return "CloudException";
                }
                return base.OperationExceptionTypeString;
            }
        }


        /// <summary>
        /// Gets the expression for response body initialization 
        /// </summary>
        public override string InitializeResponseBody
        {
            get
            {
                var sb = new IndentedStringBuilder();
                if (this.HttpMethod == HttpMethod.Head &&
                    this.ReturnType != null)
                {
                     sb.AppendLine("result.Body = (statusCode == HttpStatusCode.NoContent);");
                }
                sb.AppendLine("if (httpResponse.Headers.Contains(\"x-ms-request-id\"))")
                    .AppendLine("{").Indent()
                        .AppendLine("result.RequestId = httpResponse.Headers.GetValues(\"x-ms-request-id\").FirstOrDefault();").Outdent()
                    .AppendLine("}")
                    .AppendLine(base.InitializeResponseBody);
                return sb.ToString();
            }
        }

        /// <summary>
        /// Gets the expression for default header setting. 
        /// </summary>
        public override string SetDefaultHeaders
        {
            get
            {
                var sb= new IndentedStringBuilder();
                sb.AppendLine("httpRequest.Headers.TryAddWithoutValidation(\"x-ms-client-request-id\", Guid.NewGuid().ToString());")
                  .AppendLine(base.SetDefaultHeaders);
                return sb.ToString();
            }
        }

        /// <summary>
        /// Gets Get method invocation arguments for Long Running Operations.
        /// </summary>
        /// <param name="getMethod">Get method.</param>
        /// <returns>Invocation arguments.</returns>
        public string GetMethodInvocationArgs(Method getMethod)
        {
            if (getMethod == null)
            {
                throw new ArgumentNullException("getMethod");
            }

            var invocationParams = new List<string>();
            getMethod.Parameters
                .Where(p => LocalParameters.Any(lp => lp.Name == p.Name))
                .ForEach(p => invocationParams.Add(string.Format(CultureInfo.InvariantCulture,"{0}: {0}", p.Name)));
            invocationParams.Add("customHeaders: customHeaders");
            invocationParams.Add("cancellationToken: cancellationToken");
            return string.Join(", ", invocationParams);
        }

        /// <summary>
        /// Generate code to build the URL from a url expression and method parameters
        /// </summary>
        /// <param name="variableName">The variable to store the url in.</param>
        /// <returns></returns>
        public override string BuildUrl(string variableName)
        {
            var builder = new IndentedStringBuilder(IndentedStringBuilder.FourSpaces);
            ReplacePathParametersInUri(variableName, builder);
            AddQueryParametersToUri(variableName, builder);
            return builder.ToString();
        }

        private void AddQueryParametersToUri(string variableName, IndentedStringBuilder builder)
        {
            builder.AppendLine("List<string> queryParameters = new List<string>();");
            if (ParameterTemplateModels.Any(p => p.Location == ParameterLocation.Query))
            {
                foreach (var queryParameter in ParameterTemplateModels
                    .Where(p => p.Location == ParameterLocation.Query))
                {
                    string queryParametersAddString =
                        "queryParameters.Add(string.Format(\"{0}={{0}}\", Uri.EscapeDataString({1})));";

                    if (queryParameter.SerializedName.Equals("$filter", StringComparison.OrdinalIgnoreCase) &&
                        queryParameter.Type is CompositeType &&
                        queryParameter.Location == ParameterLocation.Query)
                    {
                        queryParametersAddString =
                            "queryParameters.Add(string.Format(\"{0}={{0}}\", FilterString.Generate(filter)));";
                    }
                    else if (queryParameter.Extensions.ContainsKey(AzureCodeGenerator.SkipUrlEncodingExtension))
                    {
                        queryParametersAddString = "queryParameters.Add(string.Format(\"{0}={{0}}\", {1}));";
                    }

                    builder.AppendLine("if ({0} != null)", queryParameter.Name)
                        .AppendLine("{").Indent()
                        .AppendLine(queryParametersAddString,
                            queryParameter.SerializedName, queryParameter.GetFormattedReferenceValue(ClientReference))
                        .Outdent()
                        .AppendLine("}");
                }
            }

            builder.AppendLine("if (queryParameters.Count > 0)")
                .AppendLine("{").Indent()
                .AppendLine("{0} += \"?\" + string.Join(\"&\", queryParameters);", variableName).Outdent()
                .AppendLine("}");
        }

        private void ReplacePathParametersInUri(string variableName, IndentedStringBuilder builder)
        {
            foreach (var pathParameter in ParameterTemplateModels.Where(p => p.Location == ParameterLocation.Path))
            {
                string replaceString = "{0} = {0}.Replace(\"{{{1}}}\", Uri.EscapeDataString({2}));";
                if (pathParameter.Extensions.ContainsKey(AzureCodeGenerator.SkipUrlEncodingExtension))
                {
                    replaceString = "{0} = {0}.Replace(\"{{{1}}}\", {2});";
                }

                builder.AppendLine(replaceString,
                    variableName,
                    pathParameter.SerializedName,
                    pathParameter.Type.ToString(ClientReference, pathParameter.Name));
            }
        }
    }
}