import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Lab900NavListComponent, NavItemGroup } from '@lab900/ui';
import { showcaseFormsNavItems } from './modules/showcase-forms/showcase-forms.nav-items';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import packageInfo from '../../package.json';
import { MatDrawer, MatDrawerContainer, MatDrawerContent, MatDrawerMode } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { SubscriptionBasedDirective } from './modules/shared/directives/subscription-based.directive';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconAnchor, MatIconButton } from '@angular/material/button';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'lab900-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    TranslateModule,
    RouterLink,
    MatDrawerContainer,
    Lab900NavListComponent,
    AsyncPipe,
    MatDrawer,
    RouterOutlet,
    MatIconAnchor,
    MatDrawerContent,
    NgOptimizedImage,
  ],
})
export class AppComponent extends SubscriptionBasedDirective implements OnInit, OnDestroy {
  private unsub = new Subject<void>();
  public readonly languages = ['en', 'nl'];
  public readonly gitUrl = packageInfo.repository;
  public readonly navItemsGroups: NavItemGroup[] = [...showcaseFormsNavItems];
  public language = 'en';
  public readonly sideNavMode$: Observable<MatDrawerMode>;

  @ViewChild('drawer')
  private drawer: MatDrawer;

  public constructor(
    private translateService: TranslateService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
  ) {
    super();

    this.translateService.setDefaultLang('en');
    this.translateService.use('en');

    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/github-logo.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'lab900',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/logo-duo-dark.svg'),
    );

    this.sideNavMode$ = this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .pipe(map(({ matches }) => (matches ? 'over' : 'side')));

    this.addSubscription(
      this.router.events.pipe(
        takeUntil(this.unsub),
        withLatestFrom(this.sideNavMode$),
        filter(([e, sideNavMode]) => e instanceof NavigationEnd && sideNavMode === 'over' && this.drawer.opened),
      ),
      () => {
        this.drawer.close();
      },
    );
  }

  public ngOnInit(): void {
    this.language = this.translateService.currentLang;
  }

  public ngOnDestroy(): void {
    this.unsub.next();
    this.unsub.unsubscribe();
  }
}
