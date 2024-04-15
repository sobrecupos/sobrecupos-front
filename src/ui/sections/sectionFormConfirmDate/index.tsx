import { Alert } from "@marketplace/ui/alert";
import { Button } from "@marketplace/ui/button";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import classNames from "classnames";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";



export interface SectionFormConfirmDateProps {
    selected: any;
    setSelected: any;
    isLoading: any;
    practitioner: any;
    handleSubmit: any;
    values: any;
    handleFieldChange: any;
}


const classes = getComponentClassNames("schedule", {
    spinner: "spinner",
    title: "title",
    subtitle: "subtitle",
    timeSlotsContainer: "time-slots-container",
    address: "address",
    addressIcon: "address-icon",
    insurances: "insurances",
    timeSlots: "time-slots",
    timeSlot: "time-slot",
    back: "back",
    table: "table",
    tableRow: "table-row",
    tableData: "table-data",
    form: "form",
    formElement: "form-element",
    label: "label",
    input: "input",
    submit: "submit",
    empty: "empty",
});


export const SectionFormConfirmDate = (
    {
        selected,
        setSelected,
        isLoading,
        practitioner,
        handleSubmit,
        values,
        handleFieldChange,
    }: SectionFormConfirmDateProps
) => {
    return (
        <div>
            <>
                <button
                    className={`btn_back`}
                    type="button"
                    onClick={() => setSelected(null)}
                    disabled={isLoading}
                >
                    <ArrowLeftIcon size={16} />
                </button>
                <div className={classes.table}>
                    <div className={classes.tableRow}>
                        <span className={classes.tableData}>Sobrecupo:</span>
                        <span
                            className={classes.tableData}
                        >{`${selected.date} a las ${selected.label}`}</span>
                    </div>
                    <div className={classes.tableRow}>
                        <span className={classes.tableData}>Especialista:</span>
                        <span className={classes.tableData}>{practitioner}</span>
                    </div>
                    <div className={classes.tableRow}>
                        <span className={classes.tableData}>Previsión:</span>
                        <span className={classes.tableData}>
                            {selected.insuranceProviders}
                        </span>
                    </div>
                    <div className={classes.tableRow}>
                        <span className={classes.tableData}>Ubicación:</span>
                        <span className={classes.tableData}>{selected.address}</span>
                    </div>
                </div>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <label className={classes.formElement}>
                        <span className={classes.label}>Nombre completo</span>
                        <input
                            className={classes.input}
                            type="text"
                            required
                            placeholder="Jose González"
                            value={values.name}
                            onChange={(event) => {
                                const { value } = event.target;
                                handleFieldChange("name", value);
                            }}
                        />
                    </label>
                    <label className={classes.formElement}>
                        <span className={classes.label}>Correo electrónico</span>
                        <input
                            className={classes.input}
                            type="email"
                            required
                            placeholder="josegonzalez@miemail.com"
                            value={values.email}
                            onChange={(event) => {
                                const { value } = event.target;
                                handleFieldChange("email", value);
                            }}
                        />
                    </label>
                    <label className={classes.formElement}>
                        <span className={classes.label}>Teléfono</span>
                        <input
                            className={classes.input}
                            type="tel"
                            required
                            placeholder="+56911223344"
                            value={values.phone}
                            onChange={(event) => {
                                const { value } = event.target;
                                handleFieldChange("phone", value);
                            }}
                        />
                    </label>
                    <label
                        className={classNames(
                            classes.formElement,
                            `${classes.formElement}--inline`
                        )}
                    >
                        <input
                            className={classes.input}
                            type="checkbox"
                            required
                            checked={values.paymentAcknowledgement}
                            onChange={(event) => {
                                const { checked } = event.target;
                                handleFieldChange("paymentAcknowledgement", checked);
                            }}
                        />
                        <span className={classes.label}>
                            Entiendo que{" "}
                            <b>sólo estoy pagando la autorización a un sobrecupo</b> y que{" "}
                            <b>debo pagar la consulta médica</b> en el lugar de atención
                        </span>
                    </label>
                    <label
                        className={classNames(
                            classes.formElement,
                            `${classes.formElement}--inline`
                        )}
                    >
                        <input
                            className={classes.input}
                            type="checkbox"
                            required
                            checked={values.termsAndConditions}
                            onChange={(event) => {
                                const { checked } = event.target;
                                handleFieldChange("termsAndConditions", checked);
                            }}
                        />
                        <span className={classes.label}>
                            Acepto{" "}
                            <Link href="/terminos-y-condiciones">
                                términos y condiciones
                            </Link>
                        </span>
                    </label>
                    <Alert type="warning">
                        Tendrás 5 minutos para finalizar tu compra en el portal de pagos.
                    </Alert>
                    <Button
                        className={classes.submit}
                        type="submit"
                        isLoading={isLoading}
                        block
                    >
                        Pagar sobrecupo $2.990
                    </Button>
                </form>
            </>
        </div>
    );
}

export default SectionFormConfirmDate;