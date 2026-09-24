export class ShowcaseExample {
  /**
   * @param component the example component. Its source must be in `examples/<name>/<name>.component.ts`,
   * where `<name>` is the selector without the `lab900-` prefix.
   * @param title shown above the example
   * @param description one sentence below the title: what the example shows and which inputs matter
   * @param extensions the source files to show, `TS` by default
   */
  public constructor(
    public component: any,
    public title?: string,
    public description?: string,
    public extensions: string[] = ['TS']
  ) {}
}
